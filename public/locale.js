TEST: "Test"
SAVE: "Save"
DELETE: "Delete"
CHOOSE_FOLLOWING_OPTIONS: "Choose among the follow options"


TEST: "Tester"
SAVE: "enregistrer"
DELETE: "effacer"
CHOOSE_FOLLOWING_OPTIONS: "Choisissez parmi les options suivantes"


TEST: "テスト"
SAVE: "セーブ"
DELETE: "削除"
CHOOSE_FOLLOWING_OPTIONS: "次のオプションから選択してください"



TEST: "XXXXXX"
SAVE: "XXXXXX"
DELETE: "XXXXXX"
CHOOSE_FOLLOWING_OPTIONS: "XXXXXX"


<button type="submit>{{SAVE}}</button>

expect(element(by.class('btn')).getText()).toEqual('XXXXXX');
expect(element.all(by.tagName('span').get(0)).getText()).toEqual('XXXXXX');