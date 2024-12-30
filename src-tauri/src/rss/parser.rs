use roxmltree::{Document, Node};
use serde::Serialize;
use tauri_plugin_http::reqwest;

#[derive(Serialize)]
pub struct RSSItem {
    title: String,
    description: String,
    url: String,
    thumbnail: Option<String>,
}

#[tauri::command]
pub async fn get_rss_items(feed_url: String) -> Result<Vec<Result<RSSItem, String>>, String> {
    let feed_result = get_feed(feed_url).await;

    let rss_items = match feed_result {
        Ok(feed) => Document::parse(&feed)
            .map(|document| parse_feed(document))
            .map_err(|err| err.to_string()),
        Err(err) => Err(err),
    };

    rss_items
}

async fn get_feed(feed_url: String) -> Result<String, String> {
    let feed_response = reqwest::get(feed_url).await;

    match feed_response {
        Ok(response) => response
            .text()
            .await
            .map_err(|err| format!("Could not fetch feed text due to: {}", err.to_string())),
        Err(err) => Err(format!(
            "Could not fetch feed response due to: {}",
            err.to_string()
        )),
    }
}

fn parse_feed(document: Document) -> Vec<Result<RSSItem, String>> {
    let mut items: Vec<Result<RSSItem, String>> = Vec::new();

    for item in document.descendants().filter(|n| n.has_tag_name("item")) {
        let title_option: Option<String> = get_tag_text(item, "title");
        let description_option = get_tag_text(item, "description");
        let link_option = get_tag_text(item, "link");
        let media_content_option = get_tag_attribute(item, "content", "url");

        let rss_item = match (title_option, description_option, link_option) {
            (Some(title), Some(description), Some(link)) => Ok(RSSItem {
                title,
                description,
                url: link,
                thumbnail: media_content_option,
            }),
            (_, _, _) => Err("Could not construct RSSItem".to_string()),
        };

        items.push(rss_item);
    }

    items
}

fn get_tag_text<'a, 'input>(node: Node<'a, 'input>, tag_name: &str) -> Option<String>
where
    'input: 'a,
{
    node.descendants()
        .find(|n| n.has_tag_name(tag_name))
        .and_then(|n| n.text().map(|text| String::from(text)))
}

fn get_tag_attribute<'a, 'input>(
    node: Node<'a, 'input>,
    tag_name: &str,
    attribute_name: &str,
) -> Option<String>
where
    'input: 'a,
{
    node.descendants()
        .find(|n| n.has_tag_name(tag_name))
        .and_then(|n| n.attribute(attribute_name).map(|text| String::from(text)))
}
