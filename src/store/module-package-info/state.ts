export interface PackageInfoStateInterface {
  name: string;
  productName: string;
  description: string;
  version: string;
}

function state (): PackageInfoStateInterface {
  return {
    name: 'scipages',
    productName: 'SciPages',
    description: '-',
    version: '0'
  }
}

export default state
