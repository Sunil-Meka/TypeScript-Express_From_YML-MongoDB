import { resolve } from "path";
import {
  UserApi,
  PostUserResponse,
  DeleteUserResponse,
  UpdateUserResponse,
  GetUsersResponse,
  GetUserResponse,
} from "../../../dist/api/user/types";
import { Api } from "../../../dist/models";
import { collections } from "../../admin/types";

export class UserApiImpl implements UserApi {
  getUsers(): Promise<GetUsersResponse> {
    return new Promise<GetUsersResponse>((resolve, reject) => {
      collections.users!.find({}).toArray(function (err: any, result: any) {
        if (err) {
          const response = <GetUsersResponse>{
            status: 400,
            body: { message: `something went wrong` },
          };
          resolve(response);
        }
        const response = <GetUsersResponse>{
          status: 201,
          body: result,
        };
        resolve(response);
      });
    });
  }

  deleteUser(email: string): Promise<DeleteUserResponse> {
    return new Promise<DeleteUserResponse>((resolve, reject) => {
      collections.users!.deleteOne(
        { email: email },
        function (err: any, result: any) {
          if (err) {
            const response = <DeleteUserResponse>{
              status: 400,
              body: { message: `something went wrong` },
            };
            resolve(response);
          }
          const response = <DeleteUserResponse>{
            status: 201,
            body: {
              message: `deleted device successfully`,
            },
          };
          resolve(response);
        }
      );
    });
  }

  updateUser(
    email: string,
    request: Api.User
  ): Promise<UpdateUserResponse> {
    return new Promise<UpdateUserResponse>((resolve, reject) => {
      collections.users!.updateOne(
        { email: email },
        { $set: request },
        function (err: any, result: any) {
          if (err) {
            const response = <UpdateUserResponse>{
              status: 400,
              body: { message: `something went wrong` },
            };
            resolve(response);
          }
          const response = <UpdateUserResponse>{
            status: 201,
            body: {
              message: `updated user successfully`,
            },
          };
          resolve(response);
        }
      );
    });
  }

  getUser(email: string): Promise<GetUserResponse> {
    return new Promise<GetUserResponse>((resolve, reject) => {
      collections.users!.findOne(
        { email: email },
        function (err: any, result: any) {
          console.log(result);
          if (result) {
            const response = <GetUserResponse>{
              status: 201,
              body: result,
            };
            console.log(response);
            resolve(response);
          }
          const response = <GetUserResponse>{
            status: 400,
            body: { message: `something went wrong` },
          };
          console.log(response);
          resolve(response);
        }
      );
    });
  }

  postUser(request: Api.User): Promise<PostUserResponse> {
    return new Promise<PostUserResponse>((resolve, reject) => {
      collections.users!.findOne(
        { email: request.email },
        function (err: any, result: any) {
          if (result) {
			const response = <PostUserResponse>{
				status: 400,
				body: { message: `user already exists` },
			  };
			  resolve(response);

          } else {
            collections.users!.insertOne(
              request,
              function (err: any, result: any) {
                if (err) {
                  const response = <PostUserResponse>{
                    status: 400,
                    body: { message: `something went wrong` },
                  };
                  resolve(response);
                }
                const response = <PostUserResponse>{
                  status: 201,
                  body: {
                    message: `created device successfully`,
                  },
                };
                resolve(response);
              }
            );
          }
        }
      );

    });
  }
}
