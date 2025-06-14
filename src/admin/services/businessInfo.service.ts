import { BusinessInfo, IBusinessInfo } from '../../models/businessInfo.model';

export class BusinessInfoService {
    static async getInfo(): Promise<IBusinessInfo | null> {
        return BusinessInfo.findOne();
    }

    static async updateInfo(data: Partial<IBusinessInfo>): Promise<IBusinessInfo> {
        let info = await BusinessInfo.findOne();
        if (!info) {
            info = await BusinessInfo.create(data);
        } else {
            Object.assign(info, data);
            await info.save();
        }
        return info;
    }

    static async uploadLogo(logoUrl: string): Promise<IBusinessInfo> {
        let info = await BusinessInfo.findOne();
        if (!info) {
            info = await BusinessInfo.create({ logoUrl, name: 'کسب‌وکار من', phone: '', address: '' });
        } else {
            info.logoUrl = logoUrl;
            await info.save();
        }
        return info;
    }
}
