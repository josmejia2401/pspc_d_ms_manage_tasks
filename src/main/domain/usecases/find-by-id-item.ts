import { OptionsHttp } from "../../transversal/http";
import { ItemManage } from "../../infrastructure/driven/dyn-item-manage/manage";
import { ItemManageImpl } from "../../infrastructure/driven/dyn-item-manage/manage-impl";
import { ItemDTO } from "../models/item";
import { Utils } from "../../transversal/utilities/utils";

export class GetItemByIdUseCase {
    private logger: any;
    private itemManage: ItemManage;

    constructor(logger: any) {
        this.logger = logger;
        this.itemManage = new ItemManageImpl(logger);
    }

    async execute(id: string, options: OptionsHttp) {
        try {
            const result: ItemDTO= await this.itemManage.getById(id, options.decodedToken!.sub!);
            if (!Utils.isEmpty(result)) {
                result.programmingLanguages = Utils.anyToJson(result.programmingLanguages);
                result.technologies = Utils.anyToJson(result.technologies);
            }
            return result;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}