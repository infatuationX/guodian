<template>
  <div id="quote">
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane label="采购需求创建" name="first">
          <div class="main">
            <div class="title">
              <span>基本情况</span>
            </div>
            <table>
              <tr>
                <td :class="{'error':buyformcheck.isDeadlineError}">报价截止时间：</td>
                <td>
                  <el-date-picker
                    v-model="buyform.deadline"
                    type="date"
                    placeholder="选择日期时间"
                    size="mini"
                    :editable="false"
                    style="width:180px"
                    @blur="checkDeadline"
                    @change="checkDeadline"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </td>
                <td :class="{'error':buyformcheck.isDeliveryDateError}">交货日期：</td>
                <td colspan="3">
                  <el-date-picker
                    v-model="buyform.deliveryDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    style="width:320px"
                    @blur="checkDeliveryDate"
                    @change="checkDeliveryDate"
                    :editable="false"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td :class="{'error':buyformcheck.isApplyCompanyError}">申请单位：</td>
                <td>
                  <el-input size="mini" disabled v-model="buyform.applyCompany" style="width:140px"></el-input>
                </td>
                <td :class="{'error':buyformcheck.isIdError}">单据编号：</td>
                <td>
                  <el-input size="mini" disabled v-model="buyform.id" style="width:140px"></el-input>
                </td>
                <td :class="{'error':buyformcheck.isProposerError}">申请人：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.proposer"
                    style="width:140px"
                    @blur="checkProposer"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td :class="{'error':buyformcheck.isIssuerError}">签发人：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.issuer"
                    style="width:140px"
                    @blur="checkIssuer"
                  ></el-input>
                </td>
                <td>申请日期：</td>
                <td>
                  <el-date-picker
                    v-model="buyform.pd"
                    type="date"
                    placeholder="选择日期"
                    size="mini"
                    :editable="false"
                    style="width:140px"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td :class="{'error':buyformcheck.isVocError}">煤种：</td>
                <td>
                  <el-select
                    v-model="buyform.voc1"
                    placeholder="请选择"
                    size="mini"
                    style="width:90px"
                    @blur="checkVoc"
                    @change="checkVoc"
                  >
                    <el-option
                      v-for="item in vocOptions1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-model="buyform.voc2"
                    placeholder="请选择"
                    size="mini"
                    style="width:90px;margin-left:10px"
                    @blur="checkVoc"
                    @change="checkVoc"
                  >
                    <el-option
                      v-for="item in vocOptions2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td :class="{'error':buyformcheck.isPqError}">采购数量：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.pq"
                    style="width:140px"
                    @blur="checkPq"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">万吨</template>
                  </el-input>
                </td>
                <td :class="{'error':buyformcheck.isTransportError}">运输方式：</td>
                <td>
                  <el-select
                    v-model="buyform.transport"
                    placeholder="请选择"
                    size="mini"
                    style="width:140px"
                    @blur="checkTransport"
                    @change="checkTransport"
                  >
                    <el-option
                      v-for="item in transportOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td :class="{'error':buyformcheck.isPlaceError}">交货地点：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.place"
                    style="width:140px"
                    @blur="checkPlace"
                  ></el-input>
                </td>
                <td :class="{'error':buyformcheck.isSettleError}">结算方式：</td>
                <td>
                  <el-select
                    v-model="buyform.settle"
                    placeholder="请选择"
                    size="mini"
                    style="width:140px"
                    @blur="checkSettle"
                    @change="checkSettle"
                  >
                    <el-option
                      v-for="item in settleOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
                <td :class="{'error':buyformcheck.isCheckError}">验收方式：</td>
                <td>
                  <el-select
                    v-model="buyform.Check"
                    placeholder="请选择"
                    size="mini"
                    style="width:140px"
                    @blur="checkCheck"
                    @change="checkCheck"
                  >
                    <el-option
                      v-for="item in checkOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td :class="{'error':buyformcheck.isMaxpriceError}">最高限价：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.maxprice"
                    style="width:160px"
                    @blur="checkMaxprice"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">元/卡.吨</template>
                  </el-input>
                </td>
                <td :class="{'error':buyformcheck.isMinpriceError}">最低限价：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.minprice"
                    style="width:160px"
                    @blur="checkMinprice"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">元/卡.吨</template>
                  </el-input>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>结算付款方式：</td>
                <td colspan="5">
                  <el-input type="textarea" placeholder="请输入内容" v-model="buyform.Payment" autosize></el-input>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="3" :class="{'error':buyformcheck.isQsError}">
                  报价保证金缴纳：
                  <el-radio v-model="qsradio" label="1" @change="checkQs">不要求</el-radio>
                  <el-radio v-model="qsradio" label="2" @change="checkQs">
                    要求&nbsp;
                    <el-input
                      size="mini"
                      v-model="buyform.qs"
                      style="width:60px"
                      @blur="checkQs"
                      onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                    ></el-input>&nbsp;元 / 吨
                  </el-radio>
                </td>
                <td colspan="3" :class="{'error':buyformcheck.isPsError}">
                  履行保证金缴纳：
                  <el-radio v-model="psradio" label="1" @change="checkPs">不要求</el-radio>
                  <el-radio v-model="psradio" label="2" @change="checkPs">
                    要求&nbsp;
                    <el-input
                      size="mini"
                      v-model="buyform.ps"
                      style="width:60px"
                      @blur="checkPs"
                      onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                    ></el-input>&nbsp;元 / 吨
                  </el-radio>
                </td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <div class="title">
              <span>煤质要求</span>
            </div>
            <table>
              <tr class="trtitle">
                <td colspan="5">
                  <strong>收到基基准</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td :class="{'error':buyformcheck.isQnetarError}">收到基低位发热量Qnet,ar ≥：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.qnetar"
                    style="width:160px"
                    @blur="checkQnetar"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">Kcal/kg</template>
                  </el-input>
                </td>
                <td :class="{'error':buyformcheck.isStarError}">收到基全硫St,ar ≤：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.star"
                    style="width:120px"
                    @blur="checkStar"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td :class="{'error':buyformcheck.isMError}">全水分 M≤：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.m"
                    style="width:120px"
                    @blur="checkM"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
              </tr>
              <tr>
                <td>收到基灰分Aar ≤：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.aar"
                    style="width:130px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td>收到基挥发分Var：</td>
                <td colspan="3">
                  <el-input
                    size="mini"
                    v-model="buyform.var1"
                    style="width:120px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>&nbsp;至&nbsp;
                  <el-input
                    size="mini"
                    v-model="buyform.var2"
                    style="width:120px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr class="trtitle">
                <td colspan="5">
                  <strong>空气干燥基基准</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>空干基水分Mad ≤：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.mad"
                    style="width:130px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td :class="{'error':buyformcheck.isStadError}">空干基全硫St,ad ≤：</td>
                <td colspan="3">
                  <el-input
                    size="mini"
                    v-model="buyform.stad"
                    style="width:130px"
                    @blur="checkStad"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>空干基挥发分Var：</td>
                <td colspan="5">
                  <el-input
                    size="mini"
                    v-model="buyform.vad1"
                    style="width:120px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>&nbsp;至&nbsp;
                  <el-input
                    size="mini"
                    v-model="buyform.vad2"
                    style="width:120px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr class="trtitle">
                <td colspan="5">
                  <strong>干基基准</strong>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>干基高位发热量Qgr,d ≥：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.qgrd"
                    style="width:160px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">Kcal/kg</template>
                  </el-input>
                </td>
                <td>干基全硫St,d ≤：</td>
                <td colspan="3">
                  <el-input
                    size="mini"
                    v-model="buyform.std"
                    style="width:130px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr style="border-bottom:none">
                <td :class="{'error':buyformcheck.isDafvError}">干燥无灰基挥发分：</td>
                <td colspan="5">
                  <el-input
                    size="mini"
                    v-model="buyform.dafv1"
                    style="width:120px"
                    @blur="checkDafv"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>&nbsp;至&nbsp;
                  <el-input
                    size="mini"
                    v-model="buyform.dafv2"
                    style="width:120px"
                    @blur="checkDafv"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <table class="trremark">
              <tr>
                <td>粒度 ≤：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.mm"
                    style="width:120px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">mm</template>
                  </el-input>
                </td>
                <td>灰熔点ST ≥：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.st"
                    style="width:120px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">℃</template>
                  </el-input>
                </td>
                <td>哈式可磨系数 ≥：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="buyform.hgi"
                    style="width:120px"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">HGI</template>
                  </el-input>
                </td>
              </tr>
              <tr>
                <td>备注：</td>
                <td colspan="5">
                  <el-input type="textarea" placeholder="请输入内容" v-model="buyform.comment" autosize></el-input>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <div class="buttongroup">
              <el-button type="primary" @click="buysumbit">提交</el-button>
              <el-button type="danger" plain @click="buyreset">重置</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="出售需求创建" name="second">
          <div class="main">
            <div class="title">
              <span>报价信息</span>
            </div>
            <table>
              <tr>
                <td>建立时间：</td>
                <td>
                  <el-date-picker
                    v-model="sellform.pubdate"
                    type="date"
                    placeholder="选择日期"
                    size="mini"
                    style="width:140px"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </td>
                <td>截止时间：</td>
                <td>
                  <el-date-picker
                    v-model="sellform.deadline"
                    type="date"
                    placeholder="选择日期"
                    size="mini"
                    :editable="false"
                    style="width:140px"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td :class="{'error':sellformCheck.isSqError}">供应数量：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.sq"
                    style="width:140px"
                    @blur="checkSellSq"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">万吨</template>
                  </el-input>
                </td>
                <td :class="{'error':sellformCheck.isRevError}">热值 ≥：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.rev"
                    style="width:160px"
                    @blur="checkSellRev"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">Kcal / kg</template>
                  </el-input>
                </td>
                <td :class="{'error':sellformCheck.isPriceError}">原煤单价：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.price"
                    style="width:140px"
                    @blur="checkSellPrice"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">元 / 吨</template>
                  </el-input>
                </td>
              </tr>
              <tr>
                <td :class="{'error':sellformCheck.isSError}">全硫 ≤：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.s"
                    style="width:140px"
                    @blur="checkSellS"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td :class="{'error':sellformCheck.isRegionError}">产地：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.region"
                    style="width:140px"
                    @blur="checkSellRegion"
                  ></el-input>
                </td>
                <td :class="{'error':sellformCheck.isTranspriceError}">运费单价：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.transprice"
                    style="width:160px"
                    @blur="checkSellTransprice"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template
                      slot="append"
                    >{{Number(sellform.price)+Number(sellform.transprice)}} 元 / 吨</template>
                  </el-input>
                </td>
              </tr>
              <tr>
                <td :class="{'error':sellformCheck.isVadError}">挥发分：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.vad1"
                    style="width:100px"
                    @blur="checkSellVad"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>至
                  <el-input
                    size="mini"
                    v-model="sellform.vad2"
                    style="width:100px"
                    @blur="checkSellVad"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td></td>
                <td></td>
                <td :class="{'error':sellformCheck.isStartError}">发货港口：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.start"
                    style="width:140px"
                    @blur="checkSellStart"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td :class="{'error':sellformCheck.isAdbaError}">空干基灰分 ≤：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.adba"
                    style="width:160px"
                    @blur="checkSellAdba"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
                <td :class="{'error':sellformCheck.isMError}">全水分 ≤：</td>
                <td>
                  <el-input
                    size="mini"
                    v-model="sellform.m"
                    style="width:160px"
                    @blur="checkSellM"
                    onkeypress="if (event.keyCode!=46 && event.keyCode!=45 && (event.keyCode<48 || event.keyCode>57)) event.returnValue=false"
                  >
                    <template slot="append">%</template>
                  </el-input>
                </td>
              </tr>
            </table>

            <div class="buttongroup">
              <el-button type="primary" @click="sellsubmit">发布商品</el-button>
              <el-button type="danger" plain @click="sellreset">重置</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 保证金缴纳 -->
    <el-dialog title="保证金明细" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <div class="title">
        <span>基本信息</span>
      </div>
      <table>
        <tr>
          <td>单据编号：</td>
          <td>
            <el-input size="mini" style="width:160px" disabled v-model="depositForm.id"></el-input>
          </td>
          <td>申请单位：</td>
          <td>
            <el-input size="mini" style="width:160px" disabled v-model="depositForm.company"></el-input>
          </td>
        </tr>
      </table>
      <div>
        注：报价保证金收取标准为
        <span style="color:red">10</span>元 / 吨
      </div>
      <div class="title">
        <span>保证金账户信息</span>
      </div>
      <table>
        <tr>
          <td>账户金额：</td>
          <td>
            <el-input size="mini" style="width:160px" disabled v-model="depositForm.balance">
              <template slot="append">元</template>
            </el-input>
          </td>
          <td>未冻结金额：</td>
          <td>
            <el-input
              size="mini"
              style="width:160px"
              disabled
              v-model="depositForm.unfrozenBalance"
            >
              <template slot="append">元</template>
            </el-input>
          </td>
        </tr>
        <tr>
          <td>报价冻结金额：</td>
          <td>
            <el-input
              size="mini"
              style="width:160px"
              disabled
              v-model="depositForm.quotefrozenBalance"
            >
              <template slot="append">元</template>
            </el-input>
          </td>
          <td>履约冻结金额：</td>
          <td>
            <el-input
              size="mini"
              style="width:160px"
              disabled
              v-model="depositForm.performancefrozenBalance"
            >
              <template slot="append">元</template>
            </el-input>
          </td>
        </tr>
        <tr>
          <td>{{titlename}}</td>
          <td>
            <el-input size="mini" style="width:160px" v-model="depositForm.number" disabled>
              <template slot="append">万吨</template>
            </el-input>
          </td>
          <td>缴纳保证金金额：</td>
          <td>
            <el-input size="mini" style="width:160px;" disabled v-model="depositForm.price">
              <template slot="append">元</template>
            </el-input>
          </td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirmPayment">确认挂牌</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'quote',
  data() {
    return {
      activeName: 'first',
      qsradio: '1',
      psradio: '1',
      buyform: {
        deadline: '',
        deliveryDate: '',
        applyCompany: '',
        // 单据编号
        id: '提交后系统生成',
        // 申请人
        proposer: '',
        // 签发人
        issuer: '',
        // 申请日期
        pd: '',
        // 煤种
        voc1: '',
        voc2: '',
        // 采购数量
        pq: '',
        // 运输方式
        transport: '',
        // 交货地点
        place: '',
        // 结算方式
        settle: '',
        // 验收方式
        Check: '',
        Payment: '',
        // 报价保障金
        qs: '',
        // 履行保障金
        ps: '',
        // 收到基低位发热量
        qnetar: '',
        // 收到基全硫
        star: '',
        // 全水分
        m: '',
        // 收到基灰分
        aar: '',
        // 收到基挥发分
        var1: '',
        // 空干基水分Mad
        mad: '',
        // 空干基全硫
        stad: '',
        // 空干基挥发分：
        vad1: '',
        vad2: '',
        // 干基高位发热量
        qgrd: '',
        // 干基全硫
        std: '',
        // 干燥无灰基挥发分：
        dafv1: '',
        dafv2: '',
        // 粒度
        mm: '',
        // 灰熔点ST
        st: '',
        // 哈式可磨系数
        hgi: '',
        // 备注
        comment: '',
        maxprice: '',
        minprice: ''
      },
      buyformcheck: {
        isDeadlineError: false,
        isDeliveryDateError: false,
        isApplyCompanyError: false,
        isIdError: false,
        isProposerError: false,
        isIssuerError: false,
        isPdError: false,
        isVocError: false,
        isPqError: false,
        isTransportError: false,
        isPlaceError: false,
        isSettleError: false,
        isCheckError: false,
        isQsError: false,
        isPsError: false,
        isQnetarError: false,
        isStarError: false,
        isMError: false,
        isStadError: false,
        isDafvError: false,
        isMaxpriceError: false,
        isMinpriceError: false
      },
      // 煤种选择
      vocOptions1: [
        {
          value: '烟煤',
          label: '烟煤'
        },
        {
          value: '无烟煤',
          label: '无烟煤'
        },
        {
          value: '褐煤',
          label: '褐煤'
        },
        {
          value: '贫瘦煤',
          label: '贫瘦煤'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      vocOptions2: [
        {
          value: '原煤',
          label: '原煤'
        },
        {
          value: '混煤',
          label: '混煤'
        },
        {
          value: '中煤',
          label: '中煤'
        },
        {
          value: '煤泥',
          label: '煤泥'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      // 运输方式选择
      transportOptions: [
        {
          value: '火车',
          label: '火车'
        },
        {
          value: '汽车',
          label: '汽车'
        },
        {
          value: '船运',
          label: '船运'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      settleOptions: [
        {
          value: '一票结算',
          label: '一票结算'
        },
        {
          value: '二票结算',
          label: '二票结算'
        },
        {
          value: '铁路大票',
          label: '铁路大票'
        },
        {
          value: '煤款税票',
          label: '煤款税票'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      checkOptions: [
        {
          value: '到厂验收',
          label: '到厂验收'
        },
        {
          value: '到厂第三方验收',
          label: '到厂第三方验收'
        },
        {
          value: '港口第三方验收',
          label: '港口第三方验收'
        }
      ],
      sellform: {
        sq: '',
        rev: '',
        price: '',
        s: '',
        region: '',
        transprice: '',
        vad1: '',
        vad2: '',
        start: '',
        adba: '',
        m: '',
        deadline: '',
        pubdate: ''
      },
      sellformCheck: {
        isSqError: false,
        isRevError: false,
        isPriceError: false,
        isSError: false,
        isRegionError: false,
        isTranspriceError: false,
        isVadError: false,
        isStartError: false,
        isAdbaError: false,
        isMError: false
      },
      // 保证金窗口
      dialogFormVisible: false,
      // 保障金表单
      depositForm: {
        id: '提交后由系统生成',
        number: '',
        company: '',
        balance: '',
        unfrozenBalance: '',
        quotefrozenBalance: '',
        performancefrozenBalance: '',
        price: ''
      },
      titlename: '',
      userinfo: {},
      // 确定挂牌摘牌
      buyflag: true
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    checkDeadline() {
      console.log(this.buyform.deadline)

      if (this.buyform.deadline === '' || this.buyform.deadline === null) {
        this.buyformcheck.isDeadlineError = true
        return false
      } else {
        this.buyformcheck.isDeadlineError = false
        return true
      }
    },
    checkDeliveryDate() {
      if (
        this.buyform.deliveryDate === '' ||
        this.buyform.deliveryDate === null
      ) {
        this.buyformcheck.isDeliveryDateError = true
        return false
      } else {
        this.buyformcheck.isDeliveryDateError = false
        console.log(this.buyform.deliveryDate[1])

        return true
      }
    },
    checkProposer() {
      if (this.buyform.proposer === '' || this.buyform.proposer === null) {
        this.buyformcheck.isProposerError = true
        return false
      } else {
        this.buyformcheck.isProposerError = false
        return true
      }
    },
    checkIssuer() {
      if (this.buyform.issuer === '' || this.buyform.issuer === null) {
        this.buyformcheck.isIssuerError = true
        return false
      } else {
        this.buyformcheck.isIssuerError = false
        return true
      }
    },
    checkVoc() {
      if (
        (this.buyform.voc1 === '' || this.buyform.voc1 === null) &&
        (this.buyform.voc2 === '' || this.buyform.voc2 === null)
      ) {
        this.buyformcheck.isVocError = true
        return false
      } else {
        this.buyformcheck.isVocError = false
        return true
      }
    },
    checkPq() {
      if (this.buyform.pq === '' || this.buyform.pq === null) {
        this.buyformcheck.isPqError = true
        return false
      } else {
        this.buyformcheck.isPqError = false
        return true
      }
    },
    checkTransport() {
      if (this.buyform.transport === '' || this.buyform.transport === null) {
        this.buyformcheck.isTransportError = true
        return false
      } else {
        this.buyformcheck.isTransportError = false
        return true
      }
    },
    checkPlace() {
      if (this.buyform.place === '' || this.buyform.place === null) {
        this.buyformcheck.isPlaceError = true
        return false
      } else {
        this.buyformcheck.isPlaceError = false
        return true
      }
    },
    checkSettle() {
      if (this.buyform.settle === '' || this.buyform.settle === null) {
        this.buyformcheck.isSettleError = true
        return false
      } else {
        this.buyformcheck.isSettleError = false
        return true
      }
    },
    checkCheck() {
      if (this.buyform.Check === '' || this.buyform.Check === null) {
        this.buyformcheck.isCheckError = true
        return false
      } else {
        this.buyformcheck.isCheckError = false
        return true
      }
    },
    checkMaxprice() {
      if (this.buyform.maxprice === '' || this.buyform.maxprice === null) {
        this.buyformcheck.isMaxpriceError = true
        return false
      } else {
        this.buyformcheck.isMaxpriceError = false
        return true
      }
    },
    checkMinprice() {
      if (this.buyform.minprice === '' || this.buyform.minprice === null) {
        this.buyformcheck.isMinpriceError = true
        return false
      } else {
        this.buyformcheck.isMinpriceError = false
        return true
      }
    },
    checkQs() {
      if (this.qsradio === '1') {
        this.buyformcheck.isQsError = false
        return true
      }
      if (this.qsradio === '2' && this.buyform.qs === '') {
        this.buyformcheck.isQsError = true
        return false
      } else {
        this.buyformcheck.isQsError = false
        return true
      }
    },
    checkPs() {
      if (this.psradio === '1') {
        this.buyformcheck.isPsError = false
        return true
      }
      if (this.psradio === '2' && this.buyform.ps === '') {
        this.buyformcheck.isPsError = true
        return false
      } else {
        this.buyformcheck.isPsError = false
        return true
      }
    },
    checkQnetar() {
      if (this.buyform.qnetar === '' || this.buyform.qnetar === null) {
        this.buyformcheck.isQnetarError = true
        return false
      } else {
        this.buyformcheck.isQnetarError = false
        return true
      }
    },
    checkStar() {
      if (this.buyform.star === '' || this.buyform.star === null) {
        this.buyformcheck.isStarError = true
        return false
      } else {
        this.buyformcheck.isStarError = false
        return true
      }
    },
    checkM() {
      if (this.buyform.m === '' || this.buyform.m === null) {
        this.buyformcheck.isMError = true
        return false
      } else {
        this.buyformcheck.isMError = false
        return true
      }
    },
    checkStad() {
      if (this.buyform.stad === '' || this.buyform.stad === null) {
        this.buyformcheck.isStadError = true
        return false
      } else {
        this.buyformcheck.isStadError = false
        return true
      }
    },
    checkDafv() {
      if (
        this.buyform.dafv1 === '' ||
        this.buyform.dafv1 === null ||
        this.buyform.dafv2 === '' ||
        this.buyform.dafv2 === null
      ) {
        this.buyformcheck.isDafvError = true
        return false
      } else {
        this.buyformcheck.isDafvError = false
        return true
      }
    },
    openMessage() {
      this.$confirm('完善个人信息后才能挂牌, 是否前往个人信息页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/member/selfpage')
        })
        .catch(() => {})
    },
    // 提交
    buysumbit() {
      if (this.userinfo.rtype === 0) {
        this.openMessage()
        return
      }
      this.checkDeadline()
      this.checkDeliveryDate()
      this.checkProposer()
      this.checkIssuer()
      this.checkVoc()
      this.checkPq()
      this.checkTransport()
      this.checkPlace()
      this.checkCheck()
      this.checkMaxprice()
      this.checkMinprice()
      this.checkQs()
      this.checkPs()
      this.checkQnetar()
      this.checkStar()
      this.checkM()
      this.checkStad()
      this.checkDafv()
      this.checkSettle()
      if (
        this.checkDeadline() &&
        this.checkDeliveryDate() &&
        this.checkProposer() &&
        this.checkIssuer() &&
        this.checkVoc() &&
        this.checkPq() &&
        this.checkTransport() &&
        this.checkPlace() &&
        this.checkCheck() &&
        this.checkMaxprice() &&
        this.checkMinprice() &&
        this.checkQs() &&
        this.checkPs() &&
        this.checkQnetar() &&
        this.checkStar() &&
        this.checkM() &&
        this.checkStad() &&
        this.checkDafv() &&
        this.checkSettle()
      ) {
        this.buyflag = true
        this.depositForm.company = this.userinfo.comName
        this.depositForm.balance = this.userinfo.balance
        this.depositForm.unfrozenBalance = this.userinfo.ua
        this.depositForm.quotefrozenBalance = this.userinfo.qfa
        this.depositForm.performancefrozenBalance = this.userinfo.pfa
        this.depositForm.number = this.buyform.pq
        this.dialogFormVisible = true
        this.depositForm.price = this.depositForm.number * 10 * 10000
        this.titlename = '采购数量'
      } else {
        this.$message.error('请填写所有必填项')
      }
    },
    // 重置
    buyreset() {
      Object.keys(this.buyform).forEach(key => (this.buyform[key] = ''))
      this.qsradio = '1'
      this.psradio = '1'
      this.buyform.id = '提交后系统生成'
      this.buyform.applyCompany = this.userinfo.comName
      Object.keys(this.buyformcheck).forEach(
        key => (this.buyformcheck[key] = false)
      )
    },
    // sell
    checkSellSq() {
      if (this.sellform.sq === '' || this.sellform.sq === null) {
        this.sellformCheck.isSqError = true
        return false
      } else {
        this.sellformCheck.isSqError = false
        return true
      }
    },
    checkSellRev() {
      if (this.sellform.rev === '' || this.sellform.rev === null) {
        this.sellformCheck.isRevError = true
        return false
      } else {
        this.sellformCheck.isRevError = false
        return true
      }
    },
    checkSellPrice() {
      if (this.sellform.price === '' || this.sellform.price === null) {
        this.sellformCheck.isPriceError = true
        return false
      } else {
        this.sellformCheck.isPriceError = false
        return true
      }
    },
    checkSellS() {
      if (this.sellform.s === '' || this.sellform.s === null) {
        this.sellformCheck.isSError = true
        return false
      } else {
        this.sellformCheck.isSError = false
        return true
      }
    },
    checkSellRegion() {
      if (this.sellform.region === '' || this.sellform.region === null) {
        this.sellformCheck.isRegionError = true
        return false
      } else {
        this.sellformCheck.isRegionError = false
        return true
      }
    },
    checkSellTransprice() {
      if (
        this.sellform.transprice === '' ||
        this.sellform.transprice === null
      ) {
        this.sellformCheck.isTranspriceError = true
        return false
      } else {
        this.sellformCheck.isTranspriceError = false
        return true
      }
    },
    checkSellVad() {
      if (this.sellform.vad1 === '' || this.sellform.vad2 === '') {
        this.sellformCheck.isVadError = true
        return false
      } else {
        this.sellformCheck.isVadError = false
        return true
      }
    },
    checkSellStart() {
      if (this.sellform.start === '' || this.sellform.start === null) {
        this.sellformCheck.isStartError = true
        return false
      } else {
        this.sellformCheck.isStartError = false
        return true
      }
    },
    checkSellAdba() {
      if (this.sellform.adba === '' || this.sellform.adba === null) {
        this.sellformCheck.isAdbaError = true
        return false
      } else {
        this.sellformCheck.isAdbaError = false
        return true
      }
    },
    checkSellM() {
      if (this.sellform.m === '' || this.sellform.m === null) {
        this.sellformCheck.isMError = true
        return false
      } else {
        this.sellformCheck.isMError = false
        return true
      }
    },
    // 只允许输入数字
    // 发布
    sellsubmit() {
      if (this.userinfo.rtype === 0) {
        this.openMessage()
        return
      }
      this.checkSellSq()
      this.checkSellRev()
      this.checkSellPrice()
      this.checkSellS()
      this.checkSellRegion()
      this.checkSellTransprice()
      this.checkSellVad()
      this.checkSellStart()
      this.checkSellAdba()
      this.checkSellM()
      if (
        this.checkSellSq() &&
        this.checkSellRev() &&
        this.checkSellPrice() &&
        this.checkSellS() &&
        this.checkSellRegion() &&
        this.checkSellTransprice() &&
        this.checkSellVad() &&
        this.checkSellStart() &&
        this.checkSellAdba() &&
        this.checkSellM()
      ) {
        this.buyflag = false
        this.depositForm.company = this.userinfo.comName
        this.depositForm.number = this.sellform.sq
        this.depositForm.balance = this.userinfo.balance
        this.depositForm.unfrozenBalance = this.userinfo.ua
        this.depositForm.quotefrozenBalance = this.userinfo.qfa
        this.depositForm.performancefrozenBalance = this.userinfo.pfa
        this.dialogFormVisible = true
        this.depositForm.price = this.depositForm.number * 10 * 10000
        this.titlename = '供应数量'
      } else {
        this.$message.error('请填写所有必填项')
      }
    },
    sellreset() {
      Object.keys(this.sellform).forEach(key => (this.sellform[key] = ''))
      Object.keys(this.sellformCheck).forEach(
        key => (this.sellformCheck[key] = false)
      )
    },
    // 获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$axios.get('/home/personal', {
        headers: {
          token: window.localStorage.token
        }
      })
      if (res.code !== 200) return this.$message('获取用户信息失败')
      this.userinfo = res.data
      this.buyform.applyCompany = this.userinfo.comName
    },
    // 缴纳保证金
    comfirmPayment() {
      this.$confirm(
        `挂牌该商品需缴纳保证金 ${this.depositForm.price}元，确认挂牌？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        if (this.buyflag === true) {
          if (this.buyform.qs === '' || this.buyform.qs === null) {
            this.buyform.qs = 0
          }
          if (this.buyform.ps === '' || this.buyform.ps === null) {
            this.buyform.ps = 0
          }
          let buydata = {
            proposer: this.buyform.proposer,
            issuer: this.buyform.issuer,
            pd: this.buyform.pd,
            earlistDt: this.buyform.deliveryDate[0],
            latestDt: this.buyform.deliveryDate[1],
            voc: this.buyform.voc1 + '&' + this.buyform.voc2,
            pq: this.buyform.pq,
            transport: this.buyform.transport,
            place: this.buyform.place,
            settle: this.buyform.settle,
            Check: this.buyform.Check,
            Payment: this.buyform.Payment,
            qs: this.buyform.qs,
            ps: this.buyform.ps,
            qnetar: this.buyform.qnetar,
            star: this.buyform.star,
            m: this.buyform.m,
            aar: this.buyform.aar,
            var1: this.buyform.var1,
            mad: this.buyform.mad,
            stad: this.buyform.stad,
            vad: this.buyform.vad1 + '至' + this.buyform.vad2,
            qgrd: this.buyform.qgrd,
            std: this.buyform.std,
            dafv: this.buyform.dafv1 + '至' + this.buyform.dafv2,
            mm: this.buyform.mm,
            st: this.buyform.st,
            hgi: this.buyform.hgi,
            comment: this.buyform.comment,
            maxPrice: this.buyform.maxprice,
            minPrice: this.buyform.minprice
          }
          this.buyputup(buydata)
        }
        if (this.buyflag === false) {
          let data = {
            sq: this.sellform.sq,
            rev: this.sellform.rev,
            price: this.sellform.price,
            s: this.sellform.s,
            region: this.sellform.region,
            transPrice: this.sellform.transprice,
            vad: this.sellform.vad1 + '至' + this.sellform.vad2,
            start: this.sellform.start,
            adba: this.sellform.adba,
            m: this.sellform.m,
            pubdate: this.sellform.pubdate,
            deadline: this.sellform.deadline
          }
          this.sellputup(data)
        }
      })
    },
    async buyputup(data) {
      let that = this
      const { data: res } = await this.$axios.post(
        '/user/buyListing',
        this.$qs.stringify(data),
        {
          headers: {
            token: window.localStorage.token
          }
        }
      )
      console.log(res)
      if (res.code !== 200) return this.$message.error(res.message)
      this.$message.success(res.data)
      setTimeout(() => {
        that.$router.go(0)
      }, 500)
    },
    async sellputup(data) {
      let that = this
      const { data: res } = await this.$axios.post(
        '/user/sellListing',
        this.$qs.stringify(data),
        {
          headers: {
            token: window.localStorage.token
          }
        }
      )
      if (res.code !== 200) return this.$message.error(res.message)
      this.$message.success(res.data)
      setTimeout(() => {
        that.$router.go(0)
      }, 500)
    }
  },

  created() {
    this.getUserInfo()
  }
}
</script>
<style lang="less">
.error {
  color: red;
}
</style>

<style lang='less' scoped>
// 错误样式

.box-card {
  margin: 10px 20px;
  width: 100%;
  /deep/ .el-tabs__nav-scroll::after {
    content: none !important;
  }
  /deep/ .el-tabs__item {
    font-size: 20px;
    color: #a4a4a4;
    font-weight: bold;
  }
  /deep/.el-tabs__item.is-active {
    color: #65656a;
  }
}

.main {
  width: 100%;
  margin: 20px 5px;
  box-sizing: border-box;
  //   基本情况title
  .title {
    border-bottom: 2px solid #409eff;
    display: flex;
    vertical-align: bottom;
    margin-top: 20px;
    span {
      color: #fff;
      padding: 5px;
      background-color: #409eff;
      font-weight: bold;
    }
  }
  table {
    width: 100%;
    font-size: 12px;
    border-collapse: collapse;
    tr {
      border-bottom: 1px dashed #a4a4a4;
      td {
        height: 40px;
      }
    }
    .trtitle {
      background-color: #e1eaff;
      strong {
        font-size: 14px;
      }
    }
  }
  .trremark {
    border-top: 1px solid #409eff;
    background-color: #f9f9f9;
  }
  .buttongroup {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    button {
      width: 100px;
      margin-left: 20px;
    }
  }
}

// 保证金
.title {
  border-bottom: 2px solid #409eff;
  display: flex;
  vertical-align: bottom;
  margin-top: 20px;
  position: relative;
  span {
    color: #fff;
    padding: 5px;
    background-color: #409eff;
    font-weight: bold;
  }
  table {
    width: 90%;
    margin: 0 auto;
    font-size: 12px;
    border-collapse: collapse;
    tr {
      border-bottom: 1px dashed #a4a4a4;
      td {
        height: 40px;
      }
    }
    .trtitle {
      background-color: #e1eaff;
      strong {
        font-size: 14px;
      }
    }
  }
}
</style>
