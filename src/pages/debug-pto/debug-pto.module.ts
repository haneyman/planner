import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebugPtoPage } from './debug-pto';

@NgModule({
  declarations: [
    DebugPtoPage,
  ],
  imports: [
    IonicPageModule.forChild(DebugPtoPage),
  ],
})
export class DebugPtoPageModule {}
