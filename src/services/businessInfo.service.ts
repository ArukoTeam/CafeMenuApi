import { BusinessInfo, IBusinessInfo } from "../models/businessInfo.model";
import { makeResponse } from "../utils/response";


export class BusinessInfoService {
    static async getInfo() {
        const info = await BusinessInfo.findOne();
        return makeResponse(info, 'اطلاعات کسب‌وکار با موفقیت دریافت شد', 200);
    }

    static async updateInfo(data: Partial<IBusinessInfo>) {
        let info = await BusinessInfo.findOne();
        if (!info) {
            info = await BusinessInfo.create(data);
        } else {
            Object.assign(info, data);
            await info.save();
        }
        return makeResponse(info, 'اطلاعات کسب‌وکار با موفقیت ویرایش شد', 200);
    }

    static async uploadLogo(logoUrl: string) {
        let info = await BusinessInfo.findOne();
        if (!info) {
            info = await BusinessInfo.create({ logoUrl, name: 'کسب‌وکار من', phone: '', address: '' });
        } else {
            info.logoUrl = logoUrl;
            await info.save();
        }

        return makeResponse({ logoUrl }, 'لوگو با موفقیت آپلود شد', 200);
    }
}
