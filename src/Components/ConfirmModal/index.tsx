import { Modal, Button } from 'antd';

interface StructProps {
  isOpen: boolean;
  title: string;
  description: string;
  buttonConfirmText?: string;
  loadingButton?: boolean;
  handleOk: () =>  void;
  handleCancel: () => void;
}

function ConfirmModal(props: StructProps) {
  return (
    <Modal
      open={props?.isOpen || false}
      title={props?.title || ''}
      onCancel={props?.handleCancel}
      footer={(_, { CancelBtn }) => (
        <>
          <CancelBtn />
          <Button type='primary' onClick={props?.handleOk} loading={props?.loadingButton || false}>
            {props?.buttonConfirmText ||  'OK'}
          </Button>
        </>
      )}
    >
      {props?.description || ''}
    </Modal>
  )
}

export default ConfirmModal;