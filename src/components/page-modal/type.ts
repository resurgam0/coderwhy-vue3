export interface ImodalConfig {
  pageName: string,
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}
export interface IModalProps {
  modalConfig: ImodalConfig
}
