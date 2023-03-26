<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BiographieController extends AbstractController
{
    #[Route('/biographie', name: 'app_biographie')]
    public function index(): Response
    {
        return $this->render('biographie/index.html.twig', [
            'controller_name' => 'BiographieController',
        ]);
    }
}
