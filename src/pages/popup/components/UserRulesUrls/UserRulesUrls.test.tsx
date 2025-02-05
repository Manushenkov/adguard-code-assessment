import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserRulesUrls from "./UserRulesUrls";
import { userRulesStore } from "../../stores/UserRulesStore";
import { POPUP_LOCALES } from "../../../../locales/popup/popup_en";

jest.mock("../../stores/UserRulesStore", () => ({
  userRulesStore: {
    userRuleUrls: "",
    invalidUrls: [],
    userRulesCounts: null,
    setUserRuleUrls: jest.fn(),
    saveText: jest.fn(),
  },
}));

describe("UserRulesUrls", () => {
  it("should render textarea and button", () => {
    render(<UserRulesUrls />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(
      POPUP_LOCALES.submitButton,
    );
  });

  it("should apply error class if invalid urls are present", () => {
    userRulesStore.invalidUrls = ["invalid-url"];

    render(<UserRulesUrls />);

    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveClass("user-rules-urls__textarea--error");
  });

  it("should call setUserRuleUrls on textarea change", () => {
    render(<UserRulesUrls />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "new url" },
    });

    expect(userRulesStore.setUserRuleUrls).toHaveBeenCalledWith("new url");
  });

  it("should display 'invalid urls' message if there are errors", () => {
    userRulesStore.invalidUrls = ["invalid-url"];

    render(<UserRulesUrls />);

    expect(
      screen.getByText(POPUP_LOCALES.invalidUrls, { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("invalid-url", { exact: false }),
    ).toBeInTheDocument();
  });

  it("should call saveText when the button is clicked", () => {
    render(<UserRulesUrls />);

    fireEvent.click(screen.getByRole("button"));

    expect(userRulesStore.saveText).toHaveBeenCalled();
  });

  it("should display user rules count", () => {
    userRulesStore.userRulesCounts = {
      totalDocumentRules: 11,
      totalSubdocumentRules: 22,
      totalRules: 33333,
    };

    render(<UserRulesUrls />);

    expect(screen.getByText("33333", { exact: false })).toBeInTheDocument();
  });
});
