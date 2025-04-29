import { pgEnum } from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', ['user', 'pro', 'admin', 'superadmin'])
export const userVersionEnum = pgEnum('user_version', ['free', 'premium'])
export const accountStatusEnum = pgEnum('account_status', ['attivo', 'sospeso', 'in_attesa_verifica'])
export const userGenderEnum = pgEnum('user_gender', ['maschile', 'femminile', 'altro', 'non_specificato']) 