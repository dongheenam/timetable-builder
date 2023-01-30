// environment variables
import * as dotenv from "dotenv";
dotenv.config();

export const URL = process.env.SYNERGETIC_URL;
export const URL_WELCOME = URL + "/welcome.aspx";
export const URL_CLASS = URL + "/class.aspx";

// regex patterns to match the class groups
export const GROUP_PATTERNS = {
  "Year 7 Science": /SE07[01]\d/,
  "Year 8 Science": /SE08[01]\d/,
  "Year 9 Science": /SE09[01]\d/,
  "Year 9 AG": /SA090\d/,
  "Year 10 Science": /SE10[01]\d/,
  "Year 10 AG": /SA100\d/,
  "Year 11 HSC": /S[BCP]110\d/,
  "Year 11 IB": /SI[BCP]H110\d/,
  "Year 11 AG": /SA110\d/,
  "Year 12 HSC": /S[BCP]120\d/,
  "Year 12 IB": /SI[BCP]H120\d/,
  "Year 12 AG": /SA120\d/,
};

// DOM IDs
export const CLASS_TITLE_SELECTOR = "#mainCDARoundPanel_HTC_DivDetails_0";

export const SEARCH_BOX_SELECTOR = "#popupSearchCritera_PW-1";
export const STAFF_CODE_INPUT_RAW_ID = "uctrlClassSearchStaffSearchComboBox_Raw";
export const STAFF_CODE_INPUT_ID = "uctrlClassSearchStaffSearchComboBox";
export const LEARNING_AREA_INPUT_SELECTOR = "#cbLArea";
export const SEARCH_BUTTON_SELECTOR = "#searchButton";

export const SEARCH_RESULTS_TABLE_SELECTOR = "#gridviewSearch_DXMainTable";
export const SEARCH_RESULTS_ROW_SELECTOR = ".dxgvDataRow";

export const TIMETABLE_OPEN_BUTTON_SELECTOR = "#ASPxNavBarRuntime_GHC4";
export const TIMETABLE_TABLE_SELECTOR = "#ASPxNavBarRuntime_GCTC4_ctl01_4_gridviewTimetable_4_DXMainTable";