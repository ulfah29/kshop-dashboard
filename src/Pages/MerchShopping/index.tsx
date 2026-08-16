import { useEffect, useRef, useState } from "react";
import { Table, Button, Space, notification, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDashboardContext } from "../../context";
import useProductList from "../../Hooks/useProductList";
import useDeleteProduct from "../../Hooks/useDeleteProduct";
import { formatCurrency } from '../../lib/formatCurrency';
import AddProductModal from './AddProductModal';
import ConfirmModal from '../../Components/ConfirmModal';
import './MerchShopping.css';
import type { StructProductList } from "../../context/types";

const { Search } = Input;

interface DataType {
    id: string;
    name: string;
    price_won: number;
    exchange_rate: number;
    weight: number;
    web_shipping_cost: number;
    local_shipping_cost: number;
    ems_price: number;
    packing_fee: number;
    total_price_product: number;
    admin_handling_fee: number;
    total_price_net: number;
    merch_group: string;
}

function MerchShopping() {
    const { dispatch } = useDashboardContext();
    const { fetchProductList, productList, isError, isLoading } = useProductList();
    const { deleteProduct, isLoading: isLoadingDeleteProduct } = useDeleteProduct();
    const [isOpenModalAddProd, setIsOpenModalAddProd] = useState(false);
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [isEditAction, setIsEditAction] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const refFirstFetchProductList = useRef(false);
    const [filteredProductList, setFilteredProductList] = useState<StructProductList[]>([]);

    useEffect(() => {
        if (!refFirstFetchProductList.current) {
            fetchProductList();
            refFirstFetchProductList.current = true;
        }
    },[refFirstFetchProductList])

    const data: DataType[] = Array.isArray(productList)
    ? productList.map((item, idx) => ({
        id: item?.id || String(idx),
        name: item?.name || '',
        price_won: item?.price_won || 0,
        exchange_rate: item?.exchange_rate_won || 0,
        weight: item?.weight || 0,
        web_shipping_cost: item?.web_shipping_cost || 0,
        local_shipping_cost: item?.local_shipping_cost || 0,
        ems_price: item?.ems_price || 0,
        packing_fee: item?.packing_fee || 0,
        total_price_product: item?.total_price_product || 0,
        admin_handling_fee: item?.admin_handling_fee || 0,
        total_price_net: item?.total_price_net || 0,
        merch_group: item?.merch_group || 'others',
    }))
    : [];

    const handleOpenConfirmDelete = (productId: string) => {
        setIsOpenConfirmDelete(true);
        setSelectedProductId(productId);
    }

    const handleAfterSuccessDelete = () => {
        setIsOpenConfirmDelete(false);
        api.open({
            description: 'Product deleted successfully.',
        });
        fetchProductList();
    }

    const handleDeleteProduct = async() => {
        deleteProduct({
            productId: selectedProductId,
            handleAfterSuccess: handleAfterSuccessDelete,
        });
    }

    const handleSelectedEditProduct = (product: StructProductList) => {
        dispatch({ type: 'SET_SELECTED_UPDATE_PRODUCT', payload: product });
        setIsOpenModalAddProd(true);
        setIsEditAction(true);
    }

    const handleOpenAddProductModal = () => {
        setIsOpenModalAddProd(true);
    }

    const handleCloseAddProductModal = () => {
        setIsOpenModalAddProd(false);
        setIsEditAction(false);
        dispatch({ type: 'SET_SELECTED_UPDATE_PRODUCT', payload: {} });
    }

    const filteredProducts = (searchVal: string) => {
        return productList.filter((product) => {
            const productName = product.name || '';

            return productName.toLowerCase().includes(searchVal);
        });
    }

    const handleSearch = (value: string) => {
        const searchVal = value.trim().toLowerCase();;

        if (searchVal) {
            const filtered = filteredProducts(searchVal);
            setFilteredProductList(filtered);
        }

        return;
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            fixed: true,
            width: 200,
        },
        {
            title: 'Group',
            dataIndex: 'merch_group',
            key: 'merch_group',
            width: 100,
            render: (merch_group: string) => merch_group.toUpperCase(),
        },
        {
            title: 'Price (won)',
            dataIndex: 'price_won',
            key: 'price_won',
            width: 100,
            render: (price_won: number) => formatCurrency(price_won, 'KRW')
        },
        {
            title: 'Exchange Rate',
            dataIndex: 'exchange_rate',
            key: 'exchange_rate',
            width: 100,
        },
        {
            title: 'Weight (*100gr)',
            key: 'weight',
            dataIndex: 'weight',
            width: 100,
        },
        {
            title: 'Web Shipping Cost',
            key: 'web_shipping_cost',
            dataIndex: 'web_shipping_cost',
            width: 100,
            render: (web_shipping_cost: number) => formatCurrency(web_shipping_cost, 'IDR'),
        }, {
            title: 'Tax/EMS',
            key: 'ems_price',
            dataIndex: 'ems_price',
            width: 100,
            render: (ems_price: number) => formatCurrency(ems_price, 'IDR'),
        }, {
            title: 'Packing Fee',
            key: 'packing_fee',
            dataIndex: 'packing_fee',
            width: 100,
            render: (packing_fee: number) => formatCurrency(packing_fee, 'IDR'),
        }, {
            title: 'Total Product Price',
            key: 'total_price_product',
            dataIndex: 'total_price_product',
            width: 100,
            render: (total_price_product: number) => formatCurrency(total_price_product, 'IDR'),
        }, {
            title: 'Admin Handling Fee',
            key: 'admin_handling_fee',
            dataIndex: 'admin_handling_fee',
            width: 100,
            render: (admin_handling_fee: number) => formatCurrency(admin_handling_fee, 'IDR'),
        }, {
            title: 'Total Price Net',
            key: 'total_price_net',
            dataIndex: 'total_price_net',
            width: 100,
            render: (total_price_net: number) => formatCurrency(total_price_net, 'IDR')
        },{
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_: any, record: StructProductList) => {
                return (
                    <Space size="medium">
                        <a onClick={() => handleSelectedEditProduct(record)}>Edit</a>
                        <a onClick={() => handleOpenConfirmDelete(String(record?.id || ''))}>Delete</a>
                    </Space>
                )
            }
        }];

    if (isError) return <div>Could not load products.</div>;

    return (
        <div className="pageWrapper">
            <div className="topAction">
                <Search
                    placeholder="input product name"
                    allowClear
                    onSearch={handleSearch}
                    style={{ width: 200 }}
                    onClear={() => setFilteredProductList([])}
                />
                <Button type="primary" onClick={handleOpenAddProductModal}>
                    <PlusOutlined />Add New Product
                </Button>
            </div>
            <Table
                rowKey="key"
                columns={columns}
                dataSource={filteredProductList.length !== 0 ? filteredProductList : data}
                pagination={false}
                loading={isLoading}
                scroll={{ x: 2000, y: 500 }}
            />

            <AddProductModal 
                isModalOpen={isOpenModalAddProd} 
                handleCloseModal={() => handleCloseAddProductModal()} 
                isEdit={isEditAction}
                refetchProductList={() =>fetchProductList()}
            />

            <ConfirmModal
                isOpen={isOpenConfirmDelete}
                title="Delete product?"
                description="This product will be permanently deleted. This action cannot be undone."
                buttonConfirmText="Delete"
                loadingButton={isLoadingDeleteProduct}
                handleOk={handleDeleteProduct}
                handleCancel={() => setIsOpenConfirmDelete(false)}
            />
            {contextHolder}
        </div>
    );
}

export default MerchShopping;
