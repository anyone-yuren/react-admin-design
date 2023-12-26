import type { styleState } from '@/components/RichText/src/RichTextSetting'

interface BaseElementState {
  x: number
  y: number
  z: number
  w: number
  h: number
  type: 'text' | 'image'
  tag: string
  active: boolean
}

export interface TextElementState extends BaseElementState {
  type: 'text'
  text: string
  style: styleState
}

export interface ImageElementState extends BaseElementState {
  type: 'image'
  url: string
}

export interface ContainerState {
  width: number
  height: number
  bgImgUrl: string
}

export interface ImageObjState {
  url: string
  width: number
  height: number
}
