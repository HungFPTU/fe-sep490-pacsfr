import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import type { WorkShiftResponse } from "../types";

export const workshiftApi = {
    async getMyShifts() {
        return http.get<WorkShiftResponse>(API_PATH.STAFF.WORKSHIFT.MY_SHIFTS, {
            loadingKey: "workshift-my-shifts"
        });
    },
};
