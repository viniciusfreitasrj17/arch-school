/* eslint-disable import/prefer-default-export */
import { sign } from 'jsonwebtoken';
import { authConfig } from '../config'

export const generateToken = (
  params: string | Buffer | Record<string, unknown>
): string => {
  return sign(params, authConfig, {
    // expiresIn: 86400 * 3 // data expire, three day
    expiresIn: 86400 // data expire, one day
  });
};
