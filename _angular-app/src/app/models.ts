export interface Category{
    id?: number;
    name: string;
    readonly slug?: string;
    active: boolean;
    readonly created_ad?:{date: string};
    readonly updated_ad?:{date: string};
}

export interface ProductCategory{
    product: Product,
    categories: Category[]
}

export interface ProductInput {
    id?: number;
    amount: number;
    readonly created_ad?:{date: string};
    readonly updated_ad?:{date: string};
    product: Product

}

export interface ProductPhoto{
    id?: number;
    photo_url: string;
    product?: Product;
    readonly created_ad?:{date: string};
    readonly updated_ad?:{date: string};
}

export interface Product{
    id?: number;
    name: string;
    description: string;
    price: number;
    readonly slug?: string;
    active: boolean;
    readonly created_ad?:{date: string};
    readonly updated_ad?:{date: string};
}

export interface User{
    id?: number;
    name: string;
    email: string;
    password?: string;
    profile?: UserProfile
    readonly created_ad?:{date: string};
    readonly updated_ad?:{date: string};
}

export interface UserProfile{
    photo_url: string;
    phone_numbe: string;
}