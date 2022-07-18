import DatabaseUtils from './database/database';
import {
  ValidationPersianName,
  GetNamesOptions,
  FindNameOptions,
  GetGenderName,
  RandomName,
} from './main_interface';
import Utils from './utils';

export default class PersianNames {
  public static validationPersianName(
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
    const names = DatabaseUtils.getAllDataInTable({
      select: '*',
      table: 'names',
    });

    const data: any = [];

    names.forEach((item: any) => {
      let id = options?.getParamsData?.id == false ? null : item.id;
      let name = options?.getParamsData?.name == false ? null : item.name;
      let gender = options?.getParamsData?.gender == false ? null : item.gender;
      let rate = options?.getParamsData?.rate == false ? null : item.rate;

      if (gender && options?.genderType)
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

    if (genderType)
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

      if (genderType)
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
    const get_name: any = [];
    let typeName = 'string[]';

    if (typeof names == 'string') {
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

      if (gender)
        to_name.gender = Utils.convertGenderType(to_name.gender, gender);

      delete to_name.id;
      delete to_name.name;
      delete to_name.rate;

      get_name.push(to_name);
    });

    if (typeName == 'string') return get_name[0];
    return get_name;
  }

  public static randomName(options?: RandomName) {
    const firstLetterName =
      options?.firstLetterName || Utils.alphabetFarsiRandom();
    const genderType = options?.genderType;
    const countOfNames = options?.countOfNames == 0 ? 1 : options?.countOfNames;
    const rateType = options?.rateType;
    const getParamsData = options?.getParamsData;
    const get_name: any = [];
    const all_name = DatabaseUtils.getAllDataInTable({
      select: '*',
      table: 'names',
    });
    all_name.forEach((item: any) => {
      if (firstLetterName && item.name.charAt(0) != firstLetterName) return;
      if (genderType)
        item.gender = Utils.convertGenderType(item.gender, genderType);
      if (rateType) item.rate = Utils.convertRateType(item.rate, rateType);

      if (getParamsData) {
        if (getParamsData.id == false) delete item.id;
        if (getParamsData.name == false) delete item.name;
        if (getParamsData.gender == false) delete item.gender;
        if (getParamsData.rate == false) delete item.rate;
      }

      get_name.push(item);
    });
    if (countOfNames) return get_name.splice(0, countOfNames);
    return get_name;
  }
}
