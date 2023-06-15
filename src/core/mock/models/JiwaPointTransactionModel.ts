import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export enum TransactionType {
  Add = 'ADD',
  Deduct = 'DEDUCT',
}

export type JiwaPointTransactionType = {
  id_point: number;
  id_user: number;
  id_transaction: number;
  transaction_type: TransactionType;
  transaction_activity: string;
  transaction_amount: number;
  createdAt: string;
  updatedAt: string | null;
  expiry_date: string | null;
};

export const JiwaPointTransactionModel: ModelDefinition<JiwaPointTransactionType> =
  Model.extend({});
