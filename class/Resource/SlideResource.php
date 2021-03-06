<?php

/*
 * See docs/AUTHORS and docs/COPYRIGHT for relevant info.
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 *
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */

namespace slideshow\Resource;

class SlideResource extends BaseAbstract
{

    /**
     * Number of seconds until user may click continue
     * @var \phpws2\Variable\IntegerVar
     */
    protected $delay;

    /**
     * Id of show that this slide belongs to.
     * @var \phpws2\Variable\IntegerVar
     */
    protected $showId;

    /**
     * Display order of slide
     * @var \phpws2\Variable\SmallInteger
     */
    protected $slideNum;

    /**
     * Title or label of slide. Does not display
     * @var \phpws2\Variable\StringVar
     */
    protected $title;

    /**
     * Prevents navigation. Must use Questions.
     * @var \phpws2\Variable\BooleanVar
     */
    protected $locked;

    /**
     *
     * @var \phpws2\Variable\FileVar
     */
    protected $backgroundImage;
    protected $table = 'ss_slide';

    public function __construct()
    {
        parent::__construct();
        $this->delay = new \phpws2\Variable\IntegerVar(0, 'delay');
        $this->showId = new \phpws2\Variable\IntegerVar(null, 'showId');
        $this->slideNum = new \phpws2\Variable\SmallInteger(0, 'slideNum');
        $this->title = new \phpws2\Variable\TextOnly('Untitled slide', 'title');
        $this->title->setLimit('255');
        $this->locked = new \phpws2\Variable\BooleanVar(false, 'locked');
        $this->backgroundImage = new \phpws2\Variable\FileVar(null,
                'backgroundImage');
        $this->backgroundImage->allowNull(true);
    }

    public function getImagePath()
    {
        return './images/slideshow/' . $this->showId . '/' . $this->id . '/';
    }

}
