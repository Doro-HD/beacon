import { result, type Result } from "$lib/util";
import { invoke, toResult, type RustResult } from "./invoke";

type FeedKind = 'RSS' | 'Youtube';

type RSSItem = {
    title: string;
    description: string;
    url: string
    thumbnail?: string;
};

/**
 * @description
 * The js function for the get_rss_items command, it retrieves the rss feed and returns a list of items from the backend.
 * Each object in the array is a rust result object 
 * @param {string} feedUrl - The url to extract the feed from
 * @returns {Promise<Result<RSSItem, string>>} - A result object containing either an ok value of RSS items or err value of string
 */
export async function getRSSItems(feedUrl: string): Promise<Result<Result<RSSItem, string>[], string>> {
    let feedKind: FeedKind = 'RSS';

    const pattern = new RegExp('https?://(?:www\\.)?youtube\\.com/feeds/videos\\.xml\\?channel_id=[a-zA-Z0-9_-]+')
    if (pattern.test(feedUrl)) {
        feedKind = 'Youtube';
    }


    const invokeResult = await invoke<RustResult<RSSItem, string>[]>('get_rss_items', { feedUrl, feedKind });

    // converts all the rust result objects in the array to a result object
    return result.map(invokeResult, rustResults => result.ok(rustResults.map(rustResult => toResult(rustResult))));
}
