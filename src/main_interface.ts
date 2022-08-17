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

export interface CustomGenderType {
  myTypeGender?: {
    male?: string;
    female?: string;
    both?: string;
  };
}
export interface MyTypeGender {
  male?: string;
  female?: string;
  both?: string;
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

export interface Limit {
  limitation?: {
    limit: number;
    offset: number;
  };
}

export interface GetNamesOptions
  extends ParamsData,
    TypeData,
    CustomGenderType,
    Limit {}

export interface FindNameOptions
  extends ParamsData,
    TypeData,
    CustomGenderType,
    ShowErrorMessage,
    ValidationPersianName,
    IncludeName {}

export interface GetGenderName extends ValidationPersianName, CustomGenderType {
  genderType?:
    | GenderType
    | 'number'
    | 'stringEn'
    | 'stringFa'
    | 'stringArb'
    | 'stringEmoji';
}

