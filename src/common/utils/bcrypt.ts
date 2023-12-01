import * as bcrypt from 'bcrypt';

/**
 * 用于哈希密码的盐
 */
const SALT_ROUNDS: number = 10;

/**
 * 对比检查密码
 * @param { string } rawStr 要比较的数据, 使用登录时传递过来的密码
 * @param { string } hashedStr 要比较的数据, 使用从数据库中查询出来的加密过的密码
 */
export const compare = async (rawStr: string, hashedStr: string) => {
    return bcrypt.compareSync(rawStr, hashedStr);
};

/**
 * 生成 hash
 * @param { string } rawStr 要加密的数据
 * @param { number } salt 用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
 */
export const hash = async (rawStr: string, salt?: number) => {
    const newSalt = bcrypt.genSaltSync(salt || SALT_ROUNDS);
    return bcrypt.hashSync(rawStr, newSalt);
};
