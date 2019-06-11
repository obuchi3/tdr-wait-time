import axios from 'axios';

export class Park {
  parkName;

  constructor(parkName) {
    this.parkName = parkName;
  }

  getJsonUrl = () => `https://tdr-wait-time.tk/${this.parkName}.json`;

  getWaitTimes = async () => (await axios.get(this.getJsonUrl())).data;

  getAttractionUrl = facilityCode =>
    `https://www.tokyodisneyresort.jp/${
      this.parkName
    }/attraction/detail/${facilityCode}/`;
}
