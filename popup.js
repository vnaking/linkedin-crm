const inputWelcomeMsgVi = document.querySelector('#inputWelcomeMsgVi');
const inputWelcomeMsgEn = document.querySelector('#inputWelcomeMsgEn');
const inputInvitationMsgVi = document.querySelector('#inputInvitationMsgVi');
const inputInvitationMsgEn = document.querySelector('#inputInvitationMsgEn');
let inputWelcomeTemplate = {
  en: '',
  vi: ''
};
let inputInvitationTemplate = {
  en: '',
  vi: ''
};
const saveBtn = document.querySelector('#saveBtn');

const saveTemplate = function () {
  inputWelcomeTemplate.en = inputWelcomeMsgEn.value;
  inputWelcomeTemplate.vi = inputWelcomeMsgVi.value;
  inputInvitationTemplate.en = inputInvitationMsgEn.value;
  inputInvitationTemplate.vi = inputInvitationMsgVi.value;
  chrome.storage.sync.set({
      inputWelcomeTemplate: JSON.stringify(inputWelcomeTemplate),
      inputInvitationTemplate: JSON.stringify(inputInvitationTemplate)
    },
    function () {}
  );
};

saveBtn.addEventListener('click', saveTemplate);

window.onload = function () {
  chrome.storage.sync.get(['inputWelcomeTemplate'], function (result) {
    if (!result) {
      chrome.storage.sync.set({
          inputWelcomeTemplate: JSON.stringify(inputWelcomeTemplate)
        },
        function () {}
      );
    } else {
      inputWelcomeTemplate = JSON.parse(result.inputWelcomeTemplate);
      inputWelcomeMsgVi.value = inputWelcomeTemplate.vi;
      inputWelcomeMsgEn.value = inputWelcomeTemplate.en;
    }
  });
  chrome.storage.sync.get(['inputInvitationTemplate'], function (result) {
    if (!result) {
      chrome.storage.sync.set({
          inputInvitationTemplate: JSON.stringify(inputInvitationTemplate)
        },
        function () {}
      );
    } else {
      inputInvitationTemplate = JSON.parse(result.inputInvitationTemplate);
      inputInvitationMsgVi.value = inputInvitationTemplate.vi;
      inputInvitationMsgEn.value = inputInvitationTemplate.en;
    }
  });
};