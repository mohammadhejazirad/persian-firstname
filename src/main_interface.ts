interface ParamsData {
  getParamsData?: {
    id?: boolean;
    name?: boolean;
    gender?: boolean;
    rate?: boolean;
  };
}

interface IncludeName {
  countAlphabets?: {
    start?: number;
    end?: number;
  };
}
export interface GenderType {
  gender: 'number' | 'stringEn' | 'stringFa' | 'stringArb' | 'stringEmoji';
}

export interface RateType {
  rate: 'number' | 'stringEn' | 'stringFa';
}

export interface TypeData {
  genderType?:
    | GenderType
    | 'number'
    | 'stringEn'
    | 'stringFa'
    | 'stringArb'
    | 'stringEmoji';
  rateType?: RateType | 'number' | 'stringEn' | 'stringFa';
}

export interface ShowErrorMessage {
  consoleLog?: boolean;
  showErrorMessage?: boolean;
}

export interface ValidationPersianName {
  convertToPersian?: boolean;
  typeCheck?: 'exact' | 'include';
  trimName?: boolean;
}

export interface GetNamesOptions extends ParamsData, TypeData {}

export interface FindNameOptions
  extends ParamsData,
    TypeData,
    ShowErrorMessage,
    ValidationPersianName,
    IncludeName {}

export interface GetGenderName extends ValidationPersianName {
  genderType?:
    | GenderType
    | 'number'
    | 'stringEn'
    | 'stringFa'
    | 'stringArb'
    | 'stringEmoji';
}

export interface RandomName extends TypeData, ParamsData {
  countOfNames?: number;
  firstLetterName?: string;
}
