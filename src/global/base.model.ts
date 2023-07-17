import { Prop, Schema } from '@nestjs/mongoose';
import { modelOptions, prop, Severity } from '@typegoose/typegoose';
@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
})
@Schema()
export abstract class BaseModel {
  @Prop()
  createdAt: Date; // provided by schemaOptions.timestamps
  @Prop()
  updatedAt: Date; // provided by schemaOptions.timestamps
}
