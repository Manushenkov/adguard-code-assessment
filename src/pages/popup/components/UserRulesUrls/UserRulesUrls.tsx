import { observer } from "mobx-react";
import classNames from "classnames";
import { POPUP_LOCALES } from "../../../../locales/popup/popup_en";
import { userRulesStore } from "../../stores/UserRulesStore";
import "./styles.css";

const UserRulesUrls = observer(() => {
  const hasError = userRulesStore.invalidUrls.length > 0;

  return (
    <div>
      <textarea
        className={classNames("user-rules-urls__textarea", {
          "user-rules-urls__textarea--error": hasError,
        })}
        value={userRulesStore.userRuleUrls}
        onChange={(e) => userRulesStore.setUserRuleUrls(e.target.value)}
      />
      <div>
        <button onClick={() => userRulesStore.saveText()}>
          {POPUP_LOCALES.submitButton}
        </button>
      </div>
      {hasError && (
        <div className="user-rules-urls__invalid-urls">
          {POPUP_LOCALES.invalidUrls}
          {userRulesStore.invalidUrls}
        </div>
      )}
      <div>
        {userRulesStore.userRulesCounts &&
          POPUP_LOCALES.userRulesCount(userRulesStore.userRulesCounts)}
      </div>
    </div>
  );
});

export default UserRulesUrls;
