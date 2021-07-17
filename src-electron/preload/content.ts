import { contextBridge, ipcRenderer } from 'electron'
import { WebsitePathItem } from '../types/WebsitePathItem'
import { Course } from '../../src-common/entities/Course'

contextBridge.exposeInMainWorld('myContentAPI', {
  getCoursesListSync (website: WebsitePathItem): Array<Course> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.sendSync('content:courses:list-sync', website)
  },
  createCourse (website: WebsitePathItem, item: Course): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.invoke('content:courses:create', website, item)
  },
  updateCourse (website: WebsitePathItem, item: Course): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.invoke('content:courses:update', website, item)
  },
  deleteCourse (website: WebsitePathItem, item: Course): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ipcRenderer.invoke('content:courses:delete', website, item)
  }
})
