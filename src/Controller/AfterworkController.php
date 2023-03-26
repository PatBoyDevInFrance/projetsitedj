<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AfterworkController extends AbstractController
{
    #[Route('/afterwork', name: 'app_afterwork')]
    public function index(): Response
    {
        return $this->render('afterwork/index.html.twig', [
            'controller_name' => 'AfterworkController',
        ]);
    }
}
