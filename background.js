const CHRONOLOGICAL = "?sorting_setting=CHRONOLOGICAL";
const REGEX = /https:\/\/www.facebook.com\/groups\/([a-zA-Z0-9._]+)\/(\?multi_permalinks=[0-9]+)?$/;

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const result = details.url.match(REGEX);

    //checks we are on facebook group url but not the main feed page, and that we've not already added the CHRONOLOGICAL param
    if (REGEX.test(details.url) && result[1] !== "feed") {
      const redirectUrl = `https://www.facebook.com/groups/${result[1]}/${CHRONOLOGICAL}`;
      return { redirectUrl: redirectUrl };
    }
  },
  {
    urls: ["https://www.facebook.com/groups/*/*"],
  },
  ["blocking"]
);
