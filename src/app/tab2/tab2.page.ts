import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { Song } from '../songs';
import { songs } from '../songs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {

  arrKey = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  key = "G";
  oldKey = "G";

  arrSong = songs;

  isInit = true;

  open = `<span style="position: relative;
  top: -0.5em;
  display: inline-block;
  width: 0;"><span style="position: relative;
  top: -0.5em;
  display: inline-block;
  width: fit-content;">`

  chart = [
    ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    ["C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C"],
    ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"],
    ["Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D"],
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"],
    ["F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"],
    ["F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F"],
    ["G", "G#", "A", "Bb", "B", "C", "C#", "D", "D#", "E", "F", "F#"],
    ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
    ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"],
    ["Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A"],
    ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"]
  ];

  constructor() {

  }

  ngAfterViewInit(): void {
    this.parse();
  }

  parse() {
    for (let i = 0; i < this.arrSong.length; i++) {
      if (this.isInit) {
        document.getElementById('song' + (i + 1)).hidden = true;
        this.arrSong[i].lyrics = "<br>" + this.arrSong[i].lyrics;
      }
      document.getElementById('song' + (i + 1)).innerHTML = this.arrSong[i].lyrics.replaceAll('\n', '<br>').replaceAll("{", this.open).replaceAll("}", "</span></span>");

    }
    this.isInit = false;
  }

  showSong(idx) {
    document.getElementById('song' + (idx + 1)).hidden = !document.getElementById('song' + (idx + 1)).hidden;
  }

  transpose() {
    for (let song of this.arrSong) {
      let s = 0;
      for (let i = 0; i < song.lyrics.length; i++) {
        if (song.lyrics[i] == '{') {
          s = i;
        }

        if (song.lyrics[i] == '}') {
          let ss = song.lyrics.substring(s + 1, i);
          let isSharp = (ss[1] == '#' || ss[1] == 'b');
          let oldChord = isSharp ? ss.slice(0, 2) : ss[0];
          let oldIdx = this.arrKey.indexOf(this.oldKey);
          let newIdx = this.arrKey.indexOf(this.key);
          let newChord = this.chart[newIdx][this.chart[oldIdx].indexOf(oldChord)];
          let newss = newChord + ss.slice(isSharp ? 2 : 1, ss.length);
          song.lyrics = song.lyrics.slice(0, s + 1) + newss + song.lyrics.slice(i);

          let isNewSharp = (newss[1] == '#' || newss[1] == 'b')
          if (!isSharp && isNewSharp) {
            i++;
          }
        }
      }
    }

    this.parse();
    this.oldKey = this.key;
  }

}
