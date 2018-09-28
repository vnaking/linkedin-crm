// [attribute~="value"] attribute value containing a specified word.
// [attribute|="value"] attribute starting with the specified value.
// [attribute^="value"] attribute value begins with a specified value.
// [attribute$="value"] attribute value ends with a specified value.
// [attribute*="value"] attribute value contains a specified value.
// document.querySelector("div[id^='feed_subtitle'] a[href='#']").innerText.substring(0,2)
// if (idx < (feeds.length - 1)) {

let numberAdsRemoved;
let isBlockAds = true;
const selectorRightAds = '#pagelet_ego_pane';
const selectorFeedItem = '.userContentWrapper';
const selectorSponsorSignal = "div[id^='feed_subtitle']";
const selectorSuggestionSignal = '.PageLikeButton';
const classRemoved = 'ad-removed';
const adSignals = [
  'SpS',
  'BeB',
  'GeG',
  'ChC',
  'KoK',
  'ppə',
  'РРэ',
  'Ивэ',
  'ได้',
  'KKo',
  'PuP',
  'RRe',
  'HiH',
  'ĐưĐ',
  'PaP',
  'MaM',
  'CoC',
  'Oñe',
  'Spo'
];

/**
 * Hide html element
 */
const hideElement = function(el) {
  if (el) {
    el.classList.add(classRemoved);
  }
};

/**
 * Show html element
 */
const showElement = function(el) {
  if (el) {
    el.classList.remove(classRemoved);
  }
};

const toggleAds = function(isBlockAds) {
  if (isBlockAds) {
    console.log('trigger remove ads');
    hideElement(document.querySelector(selectorRightAds));
    const feeds = document.querySelectorAll(
      selectorFeedItem + ':not(.' + classRemoved + ')'
    );
    feeds.forEach(item => {
      const adSignalEl = item.querySelector(selectorSponsorSignal);
      const suggestionSignalEl = item.querySelector(selectorSuggestionSignal);
      const isAds =
        adSignalEl && adSignals.includes(adSignalEl.innerText.substring(0, 3));
      if (isAds || suggestionSignalEl) {
        hideElement(item.parentElement.parentElement.parentElement);
        console.log('removed ', ++numberAdsRemoved, ' Ads');
      }
    });
  } else {
    document.querySelectorAll('.' + classRemoved).forEach(item => {
      showElement(item);
    });
  }
};

window.toggleAds = toggleAds;
numberAdsRemoved = 0;
document.arrive(selectorFeedItem, function() {
  // check isBlockAds
  chrome.storage.sync.get(['isBlockAds'], function(result) {
    if (!result) {
      chrome.storage.sync.set({ isBlockAds: true }, function() {});
      isBlockAds = true;
    } else {
      isBlockAds = result.isBlockAds ? result.isBlockAds : false;
    }
  });
  toggleAds(isBlockAds);
});
