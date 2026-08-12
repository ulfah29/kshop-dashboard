import { Modal, Form, Button, Input } from 'antd';
import './AddProductModal.css';
import { useDashboardContext } from '../../../context';
import { getLocalStorage } from '../../../lib/getLocalStorage';
import useAddProductList from '../../../Hooks/useAddProductList';
import useUpdateDataProduct from '../../../Hooks/useUpdateDataProduct';
import useProductList from '../../../Hooks/useProductList';

interface StructProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  refetchProductList: () =>void;
  isEdit?: boolean; //dafault false
}

function AddProductModal(props: StructProps) {
  const { exchangeRate, selectedEditProduct } = useDashboardContext();
  const { handleAddProduct, isLoading } = useAddProductList();
  const { handleUpadateProduct, isLoading: isLoadingUpdate } = useUpdateDataProduct();
  // const { fetchProductList } = useProductList();
  const isEditModal = props.isEdit || false;

  const getCurrentExchangeRate = () => {
    if (exchangeRate !== 0) {
      return exchangeRate;
    } else {
      const localDataExchangeRate = getLocalStorage('exchange-rate-KRW-IDR')?.rate || 0;

      return localDataExchangeRate?.toFixed(2) || exchangeRate;
    }
  }

  const onFinish = (values: any) => {
    const currentExchangeRate = getCurrentExchangeRate();
    const shippingCostInputVal = values.web_shipping_cost || 0;
    const finalWebShippingCost = shippingCostInputVal * currentExchangeRate;
    const priceWonInputVal = values.price_won || 0;
    const priceIdr = priceWonInputVal * currentExchangeRate;
    const localShippingCostInputVal = values.local_shipping_cost || 0;
    const weightInputVal = values.weight || 0;
    const emsPriceInputVal =  values.ems_price || 0;
    const finalEmsPrice = emsPriceInputVal * weightInputVal;
    const packingFeeInputVal = values.packing_fee || 0;
    const adminFeeInputVal = values.admin_handling_fee || 0;
    const totalProductPrice = priceIdr + finalWebShippingCost + localShippingCostInputVal + emsPriceInputVal + packingFeeInputVal;
    const totalPrice = Number(totalProductPrice) + Number(adminFeeInputVal);

    const constructData = {
      name: values.name || '',
      price_won: priceWonInputVal,
      exchange_rate_won: currentExchangeRate,
      price_idr: priceIdr,
      weight: weightInputVal,
      web_shipping_cost: finalWebShippingCost,
      local_shipping_cost: localShippingCostInputVal,
      ems_price: finalEmsPrice,
      packing_fee: packingFeeInputVal,
      total_price_product: totalProductPrice,
      admin_handling_fee: adminFeeInputVal,
      total_price_net: totalPrice,
      category: values.category || '',
    }

    if (isEditModal) {
      handleUpadateProduct(constructData, props?.handleCloseModal, props?.refetchProductList);
      return;
    }
      
    handleAddProduct(constructData, props?.handleCloseModal, props?.refetchProductList);
  };

  // const handleOnChangeInputNumber = (e) => {
  //   console.log('e.target.value', e)
  //   if (!isValidNumber(e.target.valueAsNumber)) {
  //     return;
  //   }
  // }

  const getInitialValues = () => {
    if (isEditModal) {
      return selectedEditProduct;
    }

    return {
      ems_price: 19000,
      local_shipping_cost: 10000,
      packing_fee: 5000
    }
  }

  return (
    <Modal
      title={isEditModal ? 'Edit Product' : 'Add New Product'}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={props?.isModalOpen || false}
      footer={null}
      destroyOnHidden
      onCancel={props?.handleCloseModal}
    >
      <Form
      layout='vertical'
      initialValues={getInitialValues()}
      onFinish={onFinish}
      style={{ maxHeight: 500, overflow: 'hidden', overflowY: 'auto', margin: '16px 0' }}
    >
      <div className='formSection'>
        <div>
          <Form.Item label="Product Name" name="name">
            <Input placeholder="Input Product Name" />
          </Form.Item>
          <Form.Item label="Price (won)" name='price_won'>
            <Input placeholder="Input Price in Won"/>
          </Form.Item>
          <Form.Item label="Web Shipping Cost (won)" name='web_shipping_cost'>
            <Input placeholder="Input Web Shipping Cost in Won" />
          </Form.Item>
          <Form.Item label="Weight (/100gr)" name='weight'>
            <Input placeholder="Input Product Weight" />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Tax/EMS Rate" name='ems_price'>
            <Input placeholder="Input Tax/EMS Rate" />
          </Form.Item>
          <Form.Item label="Local Shipping Cost (IDR)" name='local_shipping_cost'>
            <Input placeholder="Input Local Shipping Cost" />
          </Form.Item>
          <Form.Item label="Packing Fee" name='packing_fee'>
            <Input placeholder="Input Packing Fee" />
          </Form.Item>
          <Form.Item label="Admin Fee" name='admin_handling_fee'>
            <Input placeholder="Input Admin Fee" />
          </Form.Item>
        </div>
      </div>

      <div className='modalButtonFooter'>
        <Button onClick={props?.handleCloseModal}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={isLoading || isLoadingUpdate}>
          Submit
        </Button>
      </div>
    </Form>
    </Modal>
  )
}

export default AddProductModal;