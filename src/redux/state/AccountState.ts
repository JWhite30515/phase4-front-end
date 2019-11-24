export default interface IAccountState {
  isAuthenticated: boolean;
}

export const initialAccountState = {
  isAuthenticated: false,
};