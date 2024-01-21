import { RandomUserReturnType } from "../../models/User";
import HttpService from "../HttpService";
import { Endpoints } from "./types";
import { DEFAULT_PAGE_SIZE, RANDOM_USER_ME_SEED } from "./utils";

export enum UserMethods {
    GET = 'get'
}

const UsersService = {
    [UserMethods.GET]: (page: number): Promise<RandomUserReturnType> => {
        return HttpService.get(`${Endpoints.API}/?page=${page}&results=${DEFAULT_PAGE_SIZE}&seed=${RANDOM_USER_ME_SEED}`)
    }
}

export default UsersService;