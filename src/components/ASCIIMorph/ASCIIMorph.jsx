/**
 * @file ASCIIMorph.js
 * @see https://codepen.io/tholman/pen/BQLQyo
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './ASCIIMorph.module.css';

import { AsciiMorph } from '@/lib/AsciiMorph';

const ASCIIMorph = ({
  tagName: Tag = 'div',
  className = '',
  variant = 'default',
  children = '',
  asciis = [
    [
      '                _ooOoo_',
      '               o8888888o',
      '               88" . "88',
      '               (| -_- |)',
      '               O\\  =  /O',
      "            ____/`---'\\____",
      "          .'  \\\\|     |//  `.",
      '         /  \\\\|||  :  |||//  \\',
      '        /  _||||| -:- |||||_  \\',
      "        |   | \\\\\\  -  /'| |   |",
      "        | \\_|  `\\`---'//  |_/ |",
      "        \\  .-\\__ `-. -'__/-.  /",
      "      ___`. .'  /--.--\\  `. .'___",
      '   ."" \'<  `.___\\_<|>_/___.\' _> \\"".',
      "  | | :  `- \\`. ;`. _/; .'/ /  .' ; |",
      "  \\  \\ `-.   \\_\\_`. _.'_/_/  -' _.' /",
      "===`-.`___`-.__\\ \\___  /__.-'_.'_.-'===",
      "                `=--=-'    ",
    ],

    [
      '                             /',
      '                            /',
      '                           /;',
      '                          //',
      '                         ;/',
      '                       ,//',
      "                   _,-' ;_,,",
      "                _,'-_  ;|,'",
      "            _,-'_,..--. |",
      "    ___   .'-'_)'  ) _)\\|      ___",
      "  ,'\"\"\"`'' _  )   ) _)  ''--'''_,-'",
      "-={-o-  /|    )  _)  ) ; '_,--''",
      "  \\ -' ,`.  ) .)  _)_,''|",
      "   `.\"(   `------''     /",
      "     `.\\             _,'",
      '       `-.____....-\\\\',
      '                 || \\\\',
      '                 // ||',
      '                //  ||',
      '            _-.//_ _||_,',
      "              ,'  ,-'/",
    ],

    [
      '      \\`.     ___',
      '       \\ \\   / __>0',
      "   /\\  /  |/' / ",
      "  /  \\/   `  ,`'--.",
      ' / /(___________)_ \\',
      ' |/ //.-.   .-.\\\\ \\ \\',
      ' 0 // :@ ___ @: \\\\ /',
      '   ( o ^(___)^ o ) 0',
      '    \\ \\_______/ /',
      "/\\   '._______.'--.",
      '\\ /|  |<_____>    |',
      ' \\ \\__|<_____>____/|__',
      '  \\____<_____>_______/',
      '      |<_____>    |',
      '      |<_____>    |',
      '      :<_____>____:',
      '     / <_____>   /|',
      '    /  <_____>  / |',
      '   /___________/  |',
      '   |           | _|__',
      '   |           | ---||_',
      '   |   |L\\/|/  |  | [__]',
      '   |  \\|||\\|\\  |  /',
      '   |           | /',
      '   |___________|/',
    ],

    [
      '     .--------.',
      '    / .------. \\',
      '   / /        \\ \\',
      '   | |        | |',
      '  _| |________| |_',
      ".' |_|        |_| '.",
      "'._____ ____ _____.'",
      "|     .'____'.     |",
      "'.__.'.'    '.'.__.'",
      "'.__  |      |  __.'",
      "|   '.'.____.'.'   |",
      "'.____'.____.'____.'",
      "'.________________.'",
    ],

    [
      '         ____',
      '        o8%8888,',
      '      o88%8888888.',
      "     8'-    -:8888b",
      "    8'         8888",
      '   d8.-=. ,==-.:888b',
      "   >8 `~` :`~' d8888",
      '   88         ,88888',
      "   88b. `-~  ':88888",
      '   888b ~==~ .:88888',
      "   88888o--:':::8888",
      "   `88888| :::' 8888b",
      "   8888^^'       8888b",
      '  d888           ,%888b.',
      " d88%            %%%8--'-.",
      "/88:.__ ,       _%-' ---  -",
      "    '''::===..-'   =  --.  `",
    ],

    [
      '      _      _      _',
      '   __(.)< __(.)> __(.)=',
      '   \\___)  \\___)  \\___)  ',
      '          _      _      _',
      '       __(.)< __(.)> __(.)=',
      '       \\___)  \\___)  \\___)   ',
      '      _      _      _',
      '   __(.)< __(.)> __(.)=',
      '   \\___)  \\___)  \\___)   ',
      '          _      _      _',
      '       __(.)< __(.)> __(.)=',
      '       \\___)  \\___)  \\___)  ',
    ],
  ],
}) => {
  const element = React.useRef();
  let index = React.useRef(2);

  React.useEffect(() => {
    const int = setInterval(() => {
      AsciiMorph.morph(asciis[index]);
      index.current += 1;
      index.current %= asciis.length;
      console.log('index', index.current);
    }, 3000);

    AsciiMorph(element.current, { x: 51, y: 28 });

    AsciiMorph.render(element.current, asciis[0]);

    setTimeout(() => {
      AsciiMorph.morph(element.current, asciis[1]);
    }, 1000);

    return () => clearInterval(int);
  }, [asciis]);

  return (
    <Tag
      className={`${styles.a_s_c_i_i_morph} ${
        styles[`a_s_c_i_i_morph__${variant}`]
      } ${className}`}
    >
      <pre
        ref={element}
        className="morph-section absolute text-white font-mono left-[50%] top-[50%] mt-[-200px] ml-[-200px] w-[400px] h-[400px]"
      ></pre>
    </Tag>
  );
};

ASCIIMorph.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default ASCIIMorph;
