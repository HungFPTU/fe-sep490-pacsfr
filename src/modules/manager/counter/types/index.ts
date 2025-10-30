import { ServiceGroup } from '@modules/manager/service-group/types';

export type Counter = {
    id: string;
    counterCode: string;
    counterName: string;
    location: string;
    counterType: string;
    isActive: boolean;
    staffId: string;
    staffName: string;
    serviceGroups: {
        $id: string;
        $values: ServiceGroup[] | null;
    }
};