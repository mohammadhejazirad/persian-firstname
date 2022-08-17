import DatabaseUtils from './database/database';
import {
  ValidationPersianName,
  GetNamesOptions,
  FindNameOptions,
  GetGenderName,
} from './main_interface';
import Utils from './utils';

export default class PersianNames {
  public static validation(
    name: string,
    options?: ValidationPersianName
  ): boolean {
    if (options?.trimName) name = Utils.trimName(name);
    const is_name = DatabaseUtils.findItemToTable({
      select: '*',
      table: 'names',
      whereColumn: 'name',
      whereType: options?.typeCheck == 'include' ? 'LIKE' : '=',
      value: options?.convertToPersian ? Utils.toPersianCharsText(name) : name,
    });

    if (is_name) return true;
    return false;
  }

  public static getNames(options?: GetNamesOptions): any {
    const pagination = options?.limitation;
    const names = DatabaseUtils.getDataInTablePaging({
      select: '*',
      table: 'names',
      limit: {
        limit: pagination?.limit,
        offset: pagination?.offset,
      },
    });

    const data: any = [];

    names.forEach((item: any) => {
      let id = options?.getParamsData?.id == false ? null : item.id;
      let name = options?.getParamsData?.name == false ? null : item.name;
      let gender = options?.getParamsData?.gender == false ? null : item.gender;
      let rate = options?.getParamsData?.rate == false ? null : item.rate;
      const my_gender_type = options?.myTypeGender;

      if (gender && my_gender_type)
        gender = Utils.convertCustomGenderType(gender, my_gender_type);

      if (gender && options?.genderType && !my_gender_type)
        gender = Utils.convertGenderType(gender, options?.genderType);

      if (rate && options?.rateType)
        rate = Utils.convertRateType(rate, options?.rateType);

      let result: any = {};
      if (id) result.id = id;
      if (name) result.name = name;
      if (gender) result.gender = gender;
      if (rate) result.rate = rate;

      data.push(result);
    });

    return data;
  }

  public static findName(name: string, options?: FindNameOptions) {
    const convertToPersian = options?.convertToPersian;
    const typeCheck = options?.typeCheck;
    const genderType = options?.genderType;
    const rateType = options?.rateType;
    const consoleLog = options?.consoleLog;
    const getParamsData = options?.getParamsData;
    const showErrorMessage = options?.showErrorMessage;
    const trimName = options?.trimName;
    const countAlphabets = options?.countAlphabets;
    const my_gender_type = options?.myTypeGender;

    if (trimName) name = Utils.trimName(name);
    if (countAlphabets?.start || countAlphabets?.end) {
      name = name.substring(
        countAlphabets.start || 0,
        countAlphabets.end || name.length
      );
    }

    let get_name = DatabaseUtils.findItemToTable({
      select: '*',
      table: 'names',
      whereColumn: 'name',
      whereType: typeCheck == 'include' ? 'LIKE' : '=',
      value: convertToPersian ? Utils.toPersianCharsText(name) : name,
    });

    if (!get_name && showErrorMessage) return `${name} Not Found`;
    if (!get_name && consoleLog) console.log(`${name} Not Found`);
    if (!get_name) return undefined;

    if (!getParamsData?.gender && my_gender_type)
      get_name.gender = Utils.convertCustomGenderType(
        get_name.gender,
        my_gender_type
      );

    if (genderType && !my_gender_type)
      get_name.gender = Utils.convertGenderType(get_name.gender, genderType);

    if (rateType)
      get_name.rate = Utils.convertRateType(get_name.rate, rateType);

    if (getParamsData) {
      if (getParamsData.id == false) delete get_name.id;
      if (getParamsData.name == false) delete get_name.name;
      if (getParamsData.gender == false) delete get_name.gender;
      if (getParamsData.rate == false) delete get_name.rate;
    }

    return get_name;
  }

  public static findNames(names: string[], options?: FindNameOptions) {
    const convertToPersian = options?.convertToPersian;
    const typeCheck = options?.typeCheck;
    const genderType = options?.genderType;
    const rateType = options?.rateType;
    const consoleLog = options?.consoleLog;
    const getParamsData = options?.getParamsData;
    const showErrorMessage = options?.showErrorMessage;
    const trimName = options?.trimName;
    const countAlphabets = options?.countAlphabets;
    const my_gender_type = options?.myTypeGender;
    const get_name: any = [];
    if (typeof names == 'string') names = [names];

    names = names.filter((name: string, index: number) => {
      return names.indexOf(name) == index;
    });

    names.forEach((name: string) => {
      if (trimName) name = Utils.trimName(name);
      if (countAlphabets?.start || countAlphabets?.end) {
        name = name.substring(
          countAlphabets.start || 0,
          countAlphabets.end || name.length
        );
      }
      let to_name = DatabaseUtils.findItemToTable({
        select: '*',
        table: 'names',
        whereColumn: 'name',
        whereType: typeCheck == 'include' ? 'LIKE' : '=',
        value: convertToPersian ? Utils.toPersianCharsText(name) : name,
      });

      if (!to_name && showErrorMessage) to_name = `${name} Not Found`;
      if (!to_name && consoleLog) console.log(`${name} Not Found`);
      if (!to_name) return;

      if (getParamsData?.gender && my_gender_type)
        to_name.gender = Utils.convertCustomGenderType(
          to_name.gender,
          my_gender_type
        );

      if (genderType && !my_gender_type)
        to_name.gender = Utils.convertGenderType(to_name.gender, genderType);

      if (rateType)
        to_name.rate = Utils.convertRateType(to_name.rate, rateType);

      if (getParamsData) {
        if (getParamsData.id == false) delete to_name.id;
        if (getParamsData.name == false) delete to_name.name;
        if (getParamsData.gender == false) delete to_name.gender;
        if (getParamsData.rate == false) delete to_name.rate;
      }

      get_name.push(to_name);
    });

    return get_name;
  }

  public static getGenderName(
    names: string[] | string,
    options?: GetGenderName
  ): any {
    const trimName = options?.trimName;
    const convertToPersian = options?.convertToPersian;
    const gender = options?.genderType;
    const typeCheck = options?.typeCheck;
    const my_gender_type = options?.myTypeGender;
    const get_name: any = [];
    let typeName = 'string[]';

    if (typeof names === 'string') {
      typeName = 'string';
      names = [names];
    }

    names = names.filter((name: string, index: number) => {
      return names.indexOf(name) == index;
    });

    names.forEach((name: string) => {
      if (trimName) name = Utils.trimName(name);
      if (convertToPersian) name = Utils.toPersianCharsText(name);

      let to_name = DatabaseUtils.findItemToTable({
        select: '*',
        table: 'names',
        whereColumn: 'name',
        whereType: typeCheck == 'include' ? 'LIKE' : '=',
        value: Utils.toPersianCharsText(name),
      });

      if (!to_name) return;

      if (my_gender_type)
        to_name.gender = Utils.convertCustomGenderType(
          to_name.gender,
          my_gender_type
        );

      if (gender && !my_gender_type)
        to_name.gender = Utils.convertGenderType(to_name.gender, gender);

      delete to_name.id;
      delete to_name.name;
      delete to_name.rate;

      get_name.push(to_name);
    });

    if (typeName == 'string') return get_name[0];
    return get_name;
  }
}
