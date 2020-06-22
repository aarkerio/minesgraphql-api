interface IState {
    RecordsArray: any;
    OneSavedGame: any;
    TotalNumber: any;
    isLoading: boolean;
    isError: boolean;
}
declare const api_rdcr: (state: IState | object, action: any) => IState | object;
export default api_rdcr;
