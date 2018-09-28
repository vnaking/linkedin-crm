let blocker = document.querySelector('#blocker');
let config = document.querySelector('#config');
let donate = document.querySelector('#donate');
let toggleDonate = document.querySelector('#toggleDonate');
let copyWallet = document.querySelector('#copyWallet');
const ethWallet = '0xF69D5f8897Ada9880e45d11d7fec9c926D7091F5';
let isShowingDonate = false;
const classBlocking = 'blocking';

const toggleBlockingClass = function (isBlockAds) {
  if (isBlockAds) {
    config.classList.add(classBlocking);
  } else {
    config.classList.remove(classBlocking);
  }
};

const copyStringToClipboard = function (str) {
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', width: '0px', left: '-9999px' };
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

copyWallet.addEventListener('click', function () {
  copyStringToClipboard(ethWallet);
});

toggleDonate.addEventListener('click', function () {
  isShowingDonate = !isShowingDonate;
  if (isShowingDonate) {
    donate.classList.add('show');
  } else {
    donate.classList.remove('show');
  }
});

window.onload = function () {
  // Set value of toggle
  donate.querySelector('.wallet').textContent = ethWallet;
  chrome.storage.sync.get(['isBlockAds'], function (result) {
    if (!result) {
      chrome.storage.sync.set({ isBlockAds: true }, function () {
      });
      blocker.checked = true;
      toggleBlockingClass(true);
    } else {
      let isBlockAds = result.isBlockAds;
      blocker.checked = isBlockAds;
      toggleBlockingClass(isBlockAds);
    }
  });
};

// Listen toggle change
blocker.addEventListener('change', function (event) {
  let isBlockAds = event.target.checked;
  toggleBlockingClass(isBlockAds);
  chrome.storage.sync.set({ isBlockAds: isBlockAds }, function () {
    console.log('isBlockAds is ' + isBlockAds);
  });
  chrome.tabs.query({ active: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: '(window.onload = function () { window.toggleAds(' + isBlockAds + '); })();' });
  });
});

