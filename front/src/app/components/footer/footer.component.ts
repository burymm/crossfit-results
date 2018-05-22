import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon('apple',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/APPLE_icon-icons.com_65545.svg'));
    iconRegistry.addSvgIcon('andro',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/ANDROID_icon-icons.com_65547.svg'));
    iconRegistry.addSvgIcon('fb',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/FB_icon-icons.com_65534.svg'));
    iconRegistry.addSvgIcon('twit',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/TWITTER_icon-icons.com_65536.svg'));
    iconRegistry.addSvgIcon('insta',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/INSTAGRAM_icon-icons.com_65535.svg'));
    iconRegistry.addSvgIcon('tumb',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/TUMBLER_icon-icons.com_65551.svg'));
    iconRegistry.addSvgIcon('rss',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/RSS_icon-icons.com_65548.svg'));

  }

  ngOnInit() {
  }

}
