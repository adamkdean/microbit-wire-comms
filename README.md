# microbit-wire-comms

Experimental wire-based comms.

## To-do

- [x] serial clock
- [x] master -> slave comms
- [ ] slave -> master comms

## Protocol

Protocol v1:
- start of text (0x02)
- content
- end of text (0x03)

+------+---------+------+
| 0x02 | content | 0x03 |
+------+---------+------+

## Hardware

The BBC Micro:bit v2 has a Nordic nRF52833 Core variant	Arm Cortex-M4 32 bit processor with FPU at 64 MHz.

![Microbit v2](https://user-images.githubusercontent.com/1639527/201537450-9c39dbdb-c4e4-4cca-a10d-828d2061f5e1.png)

## Results

Speed results. Max throughput on BBC Microbit seems to be limited to 4 ms loop interval, and processing time, leading to a max throughput using Static TypeScript of 130.55 bps.

<style type="text/css">.column-headers-background,.row-headers-background{background:#eee;}.ritz .waffle a { color: inherit; }.ritz .waffle .s3{background-color:#ffffff;text-align:right;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s0{background-color:#ffffff;text-align:left;color:#000000;font-family:'Arial';font-size:9pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s2{background-color:#ffffff;text-align:left;font-weight:bold;color:#000000;font-family:'Arial';font-size:9pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s1{background-color:#ffffff;text-align:center;font-weight:bold;color:#000000;font-family:'Arial';font-size:9pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}.ritz .waffle .s4{background-color:#ffffff;text-align:left;color:#000000;font-family:'Arial';font-size:10pt;vertical-align:bottom;white-space:nowrap;direction:ltr;padding:2px 3px 2px 3px;}</style><div class="ritz grid-container" dir="ltr"><table class="waffle" cellspacing="0" cellpadding="0"><thead><tr><th class="row-header freezebar-origin-ltr"></th><th id="0C0" style="width:66px;" class="column-headers-background">A</th><th id="0C1" style="width:66px;" class="column-headers-background">B</th><th id="0C2" style="width:70px;" class="column-headers-background">C</th><th id="0C3" style="width:93px;" class="column-headers-background">D</th><th id="0C4" style="width:80px;" class="column-headers-background">E</th><th id="0C5" style="width:90px;" class="column-headers-background">F</th><th id="0C6" style="width:80px;" class="column-headers-background">G</th><th id="0C7" style="width:90px;" class="column-headers-background">H</th><th id="0C8" style="width:75px;" class="column-headers-background">I</th><th id="0C9" style="width:269px;" class="column-headers-background">J</th></tr></thead><tbody><tr style="height: 20px"><th id="0R0" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">1</div></th><td class="s0"></td><td class="s0"></td><td class="s1" dir="ltr"></td><td class="s1" dir="ltr"></td><td class="s1" dir="ltr" colspan="2">Tranmission</td><td class="s1" dir="ltr" colspan="2">Content</td><td class="s0"></td><td class="s0"></td></tr><tr style="height: 20px"><th id="0R1" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">2</div></th><td class="s2" dir="ltr">Clock (Hz)</td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:63px;left:-1px">Clock (ms)</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:67px;left:-1px">Tx Time (s)</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:90px;left:-1px">Tx Speed (bps)</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:77px;left:-1px">Length (bits)</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:87px;left:-1px">Length (bytes)</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:77px;left:-1px">Length (bits)</div></td><td class="s2 softmerge" dir="ltr"><div class="softmerge-inner" style="width:87px;left:-1px">Length (bytes)</div></td><td class="s2" dir="ltr">Efficiency</td><td class="s2" dir="ltr">Notes</td></tr><tr style="height: 20px"><th id="0R2" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">3</div></th><td class="s3" dir="ltr">8</td><td class="s3" dir="ltr">125</td><td class="s3" dir="ltr">17.13</td><td class="s3" dir="ltr">8.41</td><td class="s3" dir="ltr">144</td><td class="s3" dir="ltr">18</td><td class="s3" dir="ltr">128</td><td class="s3" dir="ltr">16</td><td class="s3">88.89%</td><td class="s4" dir="ltr">Sounds on</td></tr><tr style="height: 20px"><th id="0R3" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">4</div></th><td class="s3" dir="ltr">16</td><td class="s3" dir="ltr">63</td><td class="s3" dir="ltr">8.84</td><td class="s3" dir="ltr">16.30</td><td class="s3" dir="ltr">144</td><td class="s3" dir="ltr">18</td><td class="s3" dir="ltr">128</td><td class="s3" dir="ltr">16</td><td class="s3">88.89%</td><td class="s4" dir="ltr">Sounds on</td></tr><tr style="height: 20px"><th id="0R4" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">5</div></th><td class="s3" dir="ltr">32</td><td class="s3" dir="ltr">31</td><td class="s3" dir="ltr">4.42</td><td class="s3" dir="ltr">32.58</td><td class="s3" dir="ltr">144</td><td class="s3" dir="ltr">18</td><td class="s3" dir="ltr">128</td><td class="s3" dir="ltr">16</td><td class="s3">88.89%</td><td class="s4" dir="ltr">Sounds on</td></tr><tr style="height: 20px"><th id="0R5" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">6</div></th><td class="s3" dir="ltr">64</td><td class="s3" dir="ltr">16</td><td class="s3" dir="ltr">2.21</td><td class="s3" dir="ltr">65.25</td><td class="s3" dir="ltr">144</td><td class="s3" dir="ltr">18</td><td class="s3" dir="ltr">128</td><td class="s3" dir="ltr">16</td><td class="s3">88.89%</td><td class="s4" dir="ltr">Sounds on</td></tr><tr style="height: 20px"><th id="0R6" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">7</div></th><td class="s3" dir="ltr">128</td><td class="s3" dir="ltr">8</td><td class="s3" dir="ltr">1.10</td><td class="s3" dir="ltr">130.55</td><td class="s3" dir="ltr">144</td><td class="s3" dir="ltr">18</td><td class="s3" dir="ltr">128</td><td class="s3" dir="ltr">16</td><td class="s3">88.89%</td><td class="s4" dir="ltr">Sounds on</td></tr><tr style="height: 20px"><th id="0R7" style="height: 20px;" class="row-headers-background"><div class="row-header-wrapper" style="line-height: 20px">8</div></th><td class="s3" dir="ltr">256</td><td class="s3" dir="ltr">4</td><td class="s3" dir="ltr">1.10</td><td class="s3" dir="ltr">130.67</td><td class="s3" dir="ltr">144</td><td class="s3" dir="ltr">18</td><td class="s3" dir="ltr">128</td><td class="s3" dir="ltr">16</td><td class="s3">88.89%</td><td class="s4" dir="ltr">Sounds make no difference to speed</td></tr></tbody></table></div>

## Useful resources

[enums.d.ts](https://github.com/microsoft/pxt-microbit/blob/master/libs/core/enums.d.ts)

## Disclaimer

If you electrocute yourself, that's your own fault.
