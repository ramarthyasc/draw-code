export function signupHashService(password: any): Promise<string>;
export function displayUserService(listUser: any): Promise<string>;
export namespace validateAddUserService {
    function emailValidator(body: any, listUser: any): any;
    function passwordValidator(body: any): any;
}
export function addUserService(userDetail: any, addUser: any): Promise<void>;
//# sourceMappingURL=signupServices.d.ts.map