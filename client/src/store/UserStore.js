import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._isRole = 'USER';
    this._fullRole = 'null';
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._isAuth = user;
  }

  setIsRole(role) {
    this._isRole = role;
  }

  setFullRole(fullRole) {
    this._fullRole = fullRole;
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get isRole() {
    return this._isRole;
  }
  get fullRole() {
    return this._fullRole;
  }
}
