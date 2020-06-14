<?php 

        $html = ("
            <nav>
                <ul>
        ");
        foreach($categories as $category) {
            $html .= ("
                <li>
                    <a href='$baseUrlStore$category->url' class='goToUrl'>".ucfirst($category->title)."</a>
                </li>
            ");
        }
        $html .= ("
            </ul>
                </nav>
        ");