import { OptionsHttp } from "../../transversal/http";
import { ItemManage } from "../../infrastructure/driven/dyn-item-manage/manage";
import { ItemManageImpl } from "../../infrastructure/driven/dyn-item-manage/manage-impl";
import { Utils } from "../../transversal/utilities/utils";
import { ScanTransactionResponse } from "../models/common";

export class GetItemAllUseCase {
    private logger: any;
    private itemManage: ItemManage;

    constructor(logger: any) {
        this.logger = logger;
        this.itemManage = new ItemManageImpl(logger);
    }

    async execute(projectId: string, usersStoryId: string, filter: {
        lastEvaluatedKey?: string;
        segment?: number;
        limit?: number;
    }, options: OptionsHttp) {
        try {
            let scanTransactionResponse: ScanTransactionResponse;
            if (!Utils.isEmpty(projectId) && !Utils.isEmpty(usersStoryId)) {
                scanTransactionResponse = await this.itemManage.getByUserIdAndProjectIdAndUsersStory(options.decodedToken!.sub!, projectId, usersStoryId, filter);
            } else if (!Utils.isEmpty(projectId)) {
                scanTransactionResponse = await this.itemManage.getByUserIdAndProjectId(options.decodedToken!.sub!, projectId, filter);
            } else {
                scanTransactionResponse = await this.itemManage.getByUserId(options.decodedToken!.sub!, filter);
            }
            if (!Utils.isEmpty(scanTransactionResponse.results)) {
                scanTransactionResponse.results = scanTransactionResponse.results.map(p => {
                    return {
                        ...p,
                        programmingLanguages: Utils.isEmpty(p.programmingLanguages) ? [] : Utils.anyToJson(p.programmingLanguages),
                        technologies: Utils.isEmpty(p.technologies) ? [] : Utils.anyToJson(p.technologies),
                    };
                });
            }
            return scanTransactionResponse;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}