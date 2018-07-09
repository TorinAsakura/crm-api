import { ReflectMetadata } from '@nestjs/common'

export const WithAccess = (resource, action) => ReflectMetadata('withAccess', { resource, action })
