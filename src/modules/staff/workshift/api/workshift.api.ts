import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import type { WorkShift } from "../types";
import type { RestMany } from "@/types/rest";

export const workshiftApi = {
    async getMyShifts() {
        const response = await http.get<RestMany<WorkShift>>(API_PATH.STAFF.WORKSHIFT.MY_SHIFTS, {
            loadingKey: "workshift-my-shifts"
        });
        return response.data;
    },
};
