export interface roleModel {
    roleType: string,
    roleName: string,
    description: string,
    features: {
        userCreate: false, userEdit: false, userView: false, userDelete: false
    }
}